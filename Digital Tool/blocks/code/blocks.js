class UpredBlocks {
	constructor() {
		this.areaTag = document.getElementById('WORKAREA');
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			45,
			this.areaTag.clientWidth / this.areaTag.clientHeight,
			1,
			10000
		);
		this.camera.position.set(250, 450, 550);
		this.camera.lookAt(0, 0, 0);
		this.models = [];

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		this.renderer.setSize(
			this.areaTag.clientWidth,
			this.areaTag.clientHeight
		);

		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);
		this.controls.update();

		const colorA = 0xffffff;
		const intensityA = 0.6;
		const lightA = new THREE.AmbientLight(colorA, intensityA);
		this.scene.add(lightA);

		const color = 0xffffff;
		const intensity = 3;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-100, 100, 200);
		this.scene.add(light);

        this.mode='none';

		this.InitObject();
		this.InitMap(14);

		this.lastMDownTime=new Date();

		window.addEventListener('resize', this.OnWindowResize.bind(this));
		this.renderer.domElement.addEventListener('pointermove', this.OnPointerMove.bind(this));
		this.renderer.domElement.addEventListener('pointerup', this.OnPointerUp.bind(this));
		this.renderer.domElement.addEventListener('pointerdown', this.OnPointerDown.bind(this));
	}
	OnWindowResize() {
		this.areaTag = document.getElementById('WORKAREA');
		this.camera.aspect = this.areaTag.clientWidth / this.areaTag.clientHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(
			this.areaTag.clientWidth,
			this.areaTag.clientHeight
		);

		this.RenderScene();
	}
	InitMap(count) {
		this.map = [];
		for (let i = 0; i < count; i++) {
			this.map[i] = [];
			for (let j = 0; j < count; j++) {
				this.map[i][j] = [];
			}
		}
        
		this.grid = new THREE.GridHelper(this.map.length*50, this.map.length);
		this.scene.add(this.grid);
        
        const geometry = new THREE.PlaneGeometry( this.map.length*50, this.map.length*50);
		geometry.rotateX( - Math.PI / 2 );

		this.plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {color:0xffffff, opacity:0.45, visible: true, transparent:true } ) );
		this.scene.add( this.plane );
        
		this.objects.push( this.plane );
	}
	InitObject() {
        this.objects=[];

		this.woodTexture = new THREE.Texture();
		this.woodTexture.image = TEXTURE_WOOD;
		this.woodTexture.colorSpace = THREE.SRGBColorSpace;
		this.woodTexture.needsUpdate = true;

		this.woodMaterial = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			map: this.woodTexture,
		});
		this.woodMaterialTransparent = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			map: this.woodTexture,
			opacity:0.5,
			transparent:true
		});

		this.newAddMaterial=this.woodMaterial;
        const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
        this.rollOverMesh = new THREE.Mesh(rollOverGeo, this.woodMaterialTransparent);
		this.rollOverMesh.visible=false;
        this.scene.add( this.rollOverMesh );

        this.blockGeo = new THREE.BoxGeometry( 50, 50, 50 );
		const highlightMat=new THREE.MeshLambertMaterial({
			color: 0xff0000,
			opacity:0.5,
			transparent:true
		});
		const selectedtMat=new THREE.MeshLambertMaterial({
			color: 0x0000ff,
			opacity:0.5,
			transparent:true
		});
		this.cubeFrame = new THREE.Mesh(this.blockGeo, highlightMat);
		this.selectedFrame = new THREE.Mesh(this.blockGeo, selectedtMat);
        this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();		

		this.block2d=new Image();
		this.block2d.src='./asset/icon_block.png';
		upred.ui.HTML.setStyle(this.block2d,{
			position:'absolute',
			left:'0',
			top:'0',
			width:'8vh',
			height:'8vh',
			zIndex:'999999',
			opacity:'0.3',
			display:'none',
			pointerEvents:'none'
		});
		document.body.appendChild(this.block2d);
	}	
	AddWireframe(model){
		let geo = new THREE.EdgesGeometry( model.geometry,Math.PI/3);
		let mat = new THREE.LineBasicMaterial( { color: 0x000000,linewidth: 1 } );
		let wireframe = new THREE.LineSegments( geo, mat );
		model.add( wireframe );
	}
	GetIndexOnMap(pos){
		return (pos+225)/50;
	}
	OnPointerMove(e) {
		this.areaTag = document.getElementById('WORKAREA');
		this.pointer.set(
			(e.clientX / this.areaTag.clientWidth) * 2 - 1,
			-(e.clientY / this.areaTag.clientHeight) * 2 + 1
		);

		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.raycaster.intersectObjects(this.objects, false);

		if (intersects.length > 0) {
			const intersect = intersects[0];

			this.rollOverMesh.position
				.copy(intersect.point)
				.add(intersect.face.normal);
			this.rollOverMesh.position
				.divideScalar(50)
				.floor()
				.multiplyScalar(50)
				.addScalar(25);

			if(this.mode=='add'){				
				let x=this.GetIndexOnMap(this.rollOverMesh.position.x);
				let y=this.GetIndexOnMap(this.rollOverMesh.position.z);

				this.rollOverMesh.visible=true;
				this.block2d.style.display='none';
				this.rollOverMesh.position.y=this.map[y][x].length*50+25;
			}else{
				this.curHovered=null;
				for(let i=0;i<this.map.length;i++){
					for(let j=0;j<this.map[i].length;j++){
						for(let k=0;k<this.map[i][j].length;k++){
							if(this.map[i][j][k]==intersect.object){
								this.curHovered={
									x:j, y:i, h:k, model:intersect.object
								};
								break;
							}
						}
					}
				}

				if(this.curHovered){
					this.cubeFrame.position.x=this.curHovered.model.position.x;
					this.cubeFrame.position.y=this.curHovered.model.position.y;
					this.cubeFrame.position.z=this.curHovered.model.position.z;
					this.scene.add(this.cubeFrame);
				}else{
					if(this.cubeFrame){
						this.scene.remove(this.cubeFrame);
					}
				}
			}
			//this.RenderScene();
		}else{
			if(this.mode=='add'){
				this.rollOverMesh.visible=false;
				this.block2d.style.display='block';
				this.block2d.style.left='calc('+e.pageX+'px - 4vh)';
				this.block2d.style.top='calc('+e.pageY+'px - 4vh)';
			}else{
				if(this.cubeFrame){
					this.scene.remove(this.cubeFrame);
				}
			}
		}
	}
	OnPointerDown(e) {
		this.lastMDown={x:e.pageX,y:e.pageY};
	}
	OnPointerUp(e) {
		this.areaTag = document.getElementById('WORKAREA');
		this.pointer.set(
			(e.clientX / this.areaTag.clientWidth) * 2 - 1,
			-(e.clientY / this.areaTag.clientHeight) * 2 + 1
		);
		let dist=0;
		if(this.lastMDown){
			dist=Math.abs(e.pageX-this.lastMDown.x)+Math.abs(e.pageY-this.lastMDown.y);
		}

		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.raycaster.intersectObjects(this.objects, false);

		if (intersects.length > 0) {
			const intersect = intersects[0];
			let timediff=new Date()-this.lastMDownTime;
			this.lastMDownTime=new Date();
			if (this.mode=='remove') {
				if (intersect.object !== this.plane) {
					this.scene.remove(intersect.object);
					upred.blocks.removeButton.tag.style.display='none';

					this.objects.splice(this.objects.indexOf(intersect.object), 1);
				}
			} else if(this.mode=='add'&&timediff>400){
				const box = new THREE.Mesh(this.blockGeo, this.newAddMaterial);
				if(this.newAddMaterial!=this.woodMaterial){
					this.AddWireframe(box);
				}
				box.position.copy(intersect.point).add(intersect.face.normal);
				box.position
					.divideScalar(50)
					.floor()
					.multiplyScalar(50)
					.addScalar(25);

				let x=this.GetIndexOnMap(box.position.x);
				let y=this.GetIndexOnMap(box.position.z);
				box.position.y=this.map[y][x].length*50+25;
				let h=(box.position.y-25)/50;
					
				this.scene.add(box);
				this.map[y][x][h]=box;

				this.objects.push(box);
			}else{
				if(this.curHovered){
					this.selectedFrame.position.x=this.curHovered.model.position.x;
					this.selectedFrame.position.y=this.curHovered.model.position.y;
					this.selectedFrame.position.z=this.curHovered.model.position.z;
					this.scene.add(this.selectedFrame);
					this.curSelected={
						x:this.curHovered.x, y:this.curHovered.y, h:this.curHovered.h, model:this.curHovered.model
					};
					upred.blocks.removeButton.tag.style.display='block';
				}else if(dist<50){
					this.scene.remove(this.selectedFrame);
					this.curSelected=null;
					upred.blocks.removeButton.tag.style.display='none';
				}
			}

			//this.RenderScene();
		}else{
			if(this.mode=='add'){
				this.mode='none';
				this.rollOverMesh.visible=false;
				this.block2d.style.display='none';
				upred.ui.uiModule.SelectButton(null);  
			}else if(dist<50){
				this.scene.remove(this.selectedFrame);
				this.curSelected=null;
				upred.blocks.removeButton.tag.style.display='none';
			}
		}
	}
	RenderScene() {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.RenderScene.bind(this));
	}
	ToRadian(degree) {
		return Math.PI * (degree / 180);
	}
    AddBlock(e){
		if(this.mode=='add'){
			upred.ui.uiModule.SelectButton(null);  
			this.mode='none'; 
			this.rollOverMesh.visible=false;
			this.block2d.style.display='none';
		}else{
			this.mode='add';
			this.rollOverMesh.visible=false;
			this.block2d.style.display='block';
			this.block2d.style.left='calc('+e.pageX+'px - 4vh)';
			this.block2d.style.top='calc('+e.pageY+'px - 4vh)';
			upred.ui.uiModule.SelectButton(null);        
			upred.ui.uiModule.SelectButton(upred.blocks.addButton);
		}
    }
    RemoveBlock(){
        this.mode='none';
		this.rollOverMesh.visible=false;
        upred.ui.uiModule.SelectButton(null);
        //upred.ui.uiModule.SelectButton(upred.blocks.removeButton);

		if(this.curSelected){
			const x=this.curSelected.x;
			const y=this.curSelected.y;
			const h=this.curSelected.h;
			let a=[];
			for(let i=0,j=0;i<this.map[y][x].length;i++){
				if(i==h) continue;
				a[j++]=this.map[y][x][i];
			}
			this.map[y][x]=a;
			for(let i=h;i<this.map[y][x].length;i++){
				this.map[y][x][i].position.y-=50;
			}
			this.objects.splice(this.objects.indexOf(this.curSelected.model), 1);
			this.scene.remove(this.curSelected.model);
			this.scene.remove(this.selectedFrame);
			this.curSelected=null;
			upred.blocks.removeButton.tag.style.display='none';
		}
    }
	ChangeColor(c){
		let h=c.replace(/[^\d,]/g,"").split(",");
		let hs="#"+((1<<24)+(+h[0]<<16)+(+h[1]<<8)+ +h[2]).toString(16).slice(1);
		const ccode=parseInt(hs.substr(1), 16);
		const cmat = new THREE.MeshLambertMaterial({
			color: ccode,
		});
		const cmatTrans = new THREE.MeshLambertMaterial({
			color: ccode,
			opacity:0.5,
			transparent:true
		});

		this.newAddMaterial=cmat;
		this.rollOverMesh.material=cmatTrans;

		if(this.curSelected){
			this.curSelected.model.material=cmat;
			this.AddWireframe(this.curSelected.model);
			this.scene.remove(this.selectedFrame);
			this.curSelected=null;
			upred.blocks.removeButton.tag.style.display='none';
		}
	}
}

upred.blocks = {
	addButton: null,
	removeButton: null,
	Startup: function () {
		let blocks = new UpredBlocks();
		let buttons = {
			removeBlock: {
				img: '../common/asset/bt_delete.svg',
				txt: '제거',
				handler: blocks.RemoveBlock.bind(blocks),
			},
			addBlock: {
				img: './asset/icon_block.png',
				txt: '추가',
				handler: null,
				downHandler:blocks.AddBlock.bind(blocks),
			}
		};
        upred.blocks.addButton=buttons.addBlock;
        upred.blocks.removeButton=buttons.removeBlock;
		let ui = new upred.ui.CommonUI().StartCustom(buttons);
		upred.ui.mathModule = {};
		upred.ui.mathModule.ChangeColorHandler=blocks.ChangeColor.bind(blocks);
		upred.ui.mathModule.EnableInteraction = function () {
			for (let i = 0; i < blocks.areaTag.children.length; i++) {
				blocks.areaTag.children[i].style.pointerEvents = 'none';
			}
			blocks.renderer.domElement.style.pointerEvents = 'auto';
			blocks.renderer.domElement.style.zIndex = '800';
			blocks.areaTag.appendChild(blocks.renderer.domElement);
			blocks.mode='none';
			blocks.rollOverMesh.visible=false;
		};
		upred.ui.mathModule.DisableInteraction = function () {
			for (let i = 0; i < blocks.areaTag.children.length; i++) {
				blocks.areaTag.children[i].style.pointerEvents = 'auto';
			}
			blocks.renderer.domElement.style.pointerEvents = 'none';
			blocks.renderer.domElement.style.zIndex = '10';
			blocks.areaTag.insertBefore(
				blocks.renderer.domElement,
				blocks.areaTag.firstChild
			);
			blocks.mode='none';
			blocks.rollOverMesh.visible=false;
		};

		for (let i = 0; i < blocks.areaTag.children.length; i++) {
			blocks.areaTag.children[i].style.pointerEvents = 'none';
		}
		upred.blocks.removeButton.tag.style.display='none';
		blocks.renderer.domElement.style.pointerEvents = 'auto';
		blocks.renderer.domElement.style.zIndex = '800';
		blocks.areaTag.appendChild(blocks.renderer.domElement);
		blocks.RenderScene();

		upred.ui.GuideViewer.Show('./asset/guide.png');
	},
};
upred.blocks.Startup();
