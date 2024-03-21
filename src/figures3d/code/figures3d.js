class Figures3D {
	constructor() {
		this.paletteTag = document.getElementById('UI_PALETTE');
		this.paletteScene = new THREE.Scene();
		
		let ww2=25;
		let hh2=this.paletteTag.clientHeight/this.paletteTag.clientWidth*25;
		this.paletteCamera = new THREE.OrthographicCamera(-ww2, ww2,hh2, -hh2, 1, 10000 );
		this.paletteCamera.position.set(70, 70, 200);
		this.paletteCamera.lookAt(0, 0, 0);
		this.paletteCamera.aspect = this.paletteTag.clientWidth / this.paletteTag.clientHeight;
		this.paletteCamera.updateProjectionMatrix();
		this.paletteScene.add( this.paletteCamera );
		this.paletteRenderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		this.paletteRenderer.setSize(
			this.paletteTag.clientWidth,
			this.paletteTag.clientHeight
		);


		this.areaTag = document.getElementById('WORKAREA');
		this.scene = new THREE.Scene();
		let ww=this.areaTag.clientWidth / this.areaTag.clientHeight*60;
		let hh=60;
		this.camera = new THREE.OrthographicCamera(-ww, ww,hh, -hh, 1, 10000 );
		/*new THREE.PerspectiveCamera(
			45,
			this.areaTag.clientWidth / this.areaTag.clientHeight,
			1,
			10000
		);*/
		this.camera.position.set(70, 70, 200);
		this.camera.lookAt(0, 0, 0);
		this.camera.aspect = this.areaTag.clientWidth / this.areaTag.clientHeight;
		this.camera.updateProjectionMatrix();

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		this.renderer.setSize(
			this.areaTag.clientWidth,
			this.areaTag.clientHeight
		);

		//this.controls = new OrbitControls( this.camera, this.renderer.domElement);
		//this.controls.setGizmosVisible(false);
		//this.controls.update();
		this.control = new TransformControls( this.camera, this.renderer.domElement );
		//this.control.addEventListener( 'change', this.RenderScene.bind(this) );
		this.control.addEventListener( 'dragging-changed', function ( event ) {
			//orbit.enabled = ! event.value;
		} );
		this.control.setMode( 'rotate' );
		//this.control.showX=false;
		//this.control.showY=false;
		//this.control.showZ=false;
		this.transformTarget=null;

		const colorA = 0xffffff;
		const intensityA = 0.6;
		const lightA = new THREE.AmbientLight(colorA, intensityA);
		const lightB = new THREE.AmbientLight(colorA, intensityA);
		this.scene.add(lightA);
		this.paletteScene.add(lightB);

		const color = 0xffffff;
		const intensity = 3;
		const lightC = new THREE.DirectionalLight(color, intensity);
		const lightD = new THREE.DirectionalLight(color, intensity);
		lightC.position.set(-1000, 1000, 2000);
		lightD.position.set(-1000, 1000, 2000);
		this.scene.add(lightC);
		this.paletteScene.add(lightD);

        this.mode='none';

		this.InitPalette();

		this.mouseChecker = new THREE.Mesh( 
			new THREE.PlaneGeometry( 10000, 10000), 
			new THREE.MeshBasicMaterial( { color:'#000000',visible: false } ) 
		);
		
        this.scene.add(this.mouseChecker);
		this.scene.add( this.control );

		window.addEventListener('resize', this.OnWindowResize.bind(this));
		this.renderer.domElement.addEventListener('pointermove', this.OnPointerMove.bind(this));
		this.renderer.domElement.addEventListener('pointerup', this.OnPointerUp.bind(this));
		this.renderer.domElement.addEventListener('pointerdown', this.OnPointerDown.bind(this));
		this.paletteTag.addEventListener('pointerdown', this.OnPointerDownPalette.bind(this));
		
		this.renderer.domElement.style.position = 'absolute';
	}
	OnWindowResize() {
		this.areaTag = document.getElementById('WORKAREA');
		this.camera.aspect = this.areaTag.clientWidth / this.areaTag.clientHeight;
		this.camera.updateProjectionMatrix();
		this.paletteTag = document.getElementById('UI_PALETTE');
		let ww2=25;
		let hh2=this.paletteTag.clientHeight/this.paletteTag.clientWidth*25;
		this.paletteCamera = new THREE.OrthographicCamera(-ww2, ww2,hh2, -hh2, 1, 10000 );
		this.paletteCamera.position.set(70, 70, 200);
		this.paletteCamera.lookAt(0, 0, 0);
		this.paletteCamera.aspect = this.paletteTag.clientWidth / this.paletteTag.clientHeight;
		this.paletteCamera.updateProjectionMatrix();

		this.renderer.setSize(
			this.areaTag.clientWidth,
			this.areaTag.clientHeight
		);
		this.paletteRenderer.setSize(
			this.paletteTag.clientWidth,
			this.paletteTag.clientHeight
		);

		this.RenderScene();
	}
	AddWireframe(model){
		//let geo = new THREE.EdgesGeometry( model.geometry,Math.PI*2);
		//let mat = new THREE.LineBasicMaterial( { color: 0x000000,linewidth: 1 } );
		//let wireframe = new THREE.LineSegments( geo, mat );
		//model.add( wireframe );
	}
	InitPalette() {
        this.objects=[];

		const highlightMat=new THREE.MeshLambertMaterial({
			color: 0xff0000,
			opacity:0.5,
			transparent:true
		});
        this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();		

		const cube= new THREE.Mesh(
			new THREE.BoxGeometry( 20, 20, 20 ), 
			new THREE.MeshLambertMaterial({color: 0x7DCEA0})
		);
		const cylindar= new THREE.Mesh(
			new THREE.CylinderGeometry( 10, 10, 20, 128 ), 
			new THREE.MeshLambertMaterial({color: 0xF1948A})
		);
		const ball= new THREE.Mesh(
			new THREE.SphereGeometry( 10, 64, 32 ), 
			new THREE.MeshLambertMaterial({color: 0xF4D03F})
		);
		const cubeSmall= new THREE.Mesh(
			new THREE.BoxGeometry( 10, 10, 10 ), 
			new THREE.MeshLambertMaterial({color: 0x7DCEA0})
		);
		const cylindarSmall= new THREE.Mesh(
			new THREE.CylinderGeometry( 5, 5, 10, 128 ), 
			new THREE.MeshLambertMaterial({color: 0xF1948A})
		);
		const ballSmall= new THREE.Mesh(
			new THREE.SphereGeometry( 5, 64, 32 ), 
			new THREE.MeshLambertMaterial({color: 0xF4D03F})
		);

		
		this.paletteObjects=[cube,cubeSmall,cylindar,cylindarSmall,ball,ballSmall];
		for(let i=0;i<this.paletteObjects.length;i++){
			if(window.innerWidth<600){
				this.paletteObjects[i].position.x=(i-2)*7-2;
				this.paletteObjects[i].position.y=0;
				this.paletteObjects[i].scale.x=0.3;
				this.paletteObjects[i].scale.y=0.3;
				this.paletteObjects[i].scale.z=0.3;
			}else{
				this.paletteObjects[i].position.y=(3-i)*27-20;
			}
			this.AddWireframe(this.paletteObjects[i]);
			this.paletteScene.add(this.paletteObjects[i]);
			//this.scene.add(objs[i]);
		}
	}
	OnPointerMove(e) {
		let palPos=this.paletteTag.getBoundingClientRect();
		if(this.mode=='NEW'){
			let pos=this.GetWorldPositionByMouse(e);
			this.moving.position.x=pos.x;
			this.moving.position.y=pos.y;

			if(e.pageX<palPos.right && e.pageX>palPos.left&&e.pageY>palPos.top&&e.pageY<palPos.bottom){
				this.moving.material.opacity=0.7;
				this.moving.material.transparent=true;
			}else{
				this.moving.material.opacity=1;
				this.moving.material.transparent=false;
			}
		}if(this.mode=='MOVE'&&this.lastSelected){
			if(this.transformTarget==null){
				let dx=0;
				let dy=0;

				let pos=this.GetWorldPositionByMouse(e);
				
				dx=pos.x-this.oldPosition.x;
				dy=pos.y-this.oldPosition.y;
				
				this.lastSelected.position.x=this.oldPosition.ox+dx;
				this.lastSelected.position.y=this.oldPosition.oy+dy;
				e.preventDefault();
				e.stopPropagation();
			}
		}else{
			this.pointer.set(
				(e.pageX / this.renderer.domElement.clientWidth) * 2 - 1,
				-(e.pageY / this.renderer.domElement.clientHeight) * 2 + 1
			);

			this.raycaster.setFromCamera(this.pointer, this.camera);
			const intersects = this.raycaster.intersectObjects(this.objects, false);

			if (intersects.length > 0) {
				const obj = intersects[0].object;
				if(this.lastHovered){
					if(this.lastHovered==this.lastSelected){
						this.lastHovered.material.color=new THREE.Color(0x2874A6);
					}else{
						this.lastHovered.material.color=this.lastHovered.oldColorValue;
					}
				}
				if(obj!=this.lastSelected) obj.material.color=new THREE.Color(0xCA6F1E);
				this.lastHovered=obj;
			}else{
				if(this.lastHovered){
					if(this.lastHovered==this.lastSelected){
						this.lastHovered.material.color=new THREE.Color(0x2874A6);
					}else{
						this.lastHovered.material.color=this.lastHovered.oldColorValue;
					}
				}
				this.lastHovered=null;
			}
		}
	}
	OnPointerDown(e) {
		this.pointer.set(
			(e.pageX / this.renderer.domElement.clientWidth) * 2 - 1,
			-(e.pageY / this.renderer.domElement.clientHeight) * 2 + 1
		);

		this.raycaster.setFromCamera(this.pointer, this.camera);
		const intersects = this.raycaster.intersectObjects(this.objects, false);

		if(this.lastSelected){
			this.lastSelected.material.color=this.lastSelected.oldColorValue;
			this.lastSelected=null;
		}
		if (intersects.length > 0) {			
			this.lastSelected=intersects[0].object;
			this.lastSelected.material.color=new THREE.Color(0x2874A6);

			let pos=this.GetWorldPositionByMouse(e);
			this.oldPosition={
				x:pos.x, y:pos.y, ox:this.lastSelected.position.x,oy:this.lastSelected.position.y
			};
			e.preventDefault();
			e.stopPropagation();
			//this.controls.enableRotate=false;
			this.mode='MOVE';
		}else{			
			//this.controls.enableRotate=true;
			this.control.detach();
			this.transformTarget=null;
		}
	}
	GetWorldPositionByMouse(e){
		this.pointer.set(
			(e.pageX / this.renderer.domElement.clientWidth) * 2 - 1,
			-(e.pageY / this.renderer.domElement.clientHeight) * 2 + 1
		);
		this.raycaster.setFromCamera(this.pointer, this.camera);
        let intersects = this.raycaster.intersectObjects([this.mouseChecker], false);

        if (intersects.length > 0) return intersects[0].point;
		else return null;
	}
	OnPointerDownPalette(e) {
		this.lastMDown={x:e.pageX,y:e.pageY};

		this.pointer.set(
			(e.offsetX / e.target.clientWidth) * 2 - 1,
			-(e.offsetY / e.target.clientHeight) * 2 + 1
		);
		this.raycaster.setFromCamera(this.pointer, this.paletteCamera);
		const intersects = this.raycaster.intersectObjects(this.paletteObjects, false);

		if (intersects.length > 0) {
			const obj = intersects[0].object;
			this.moving=new THREE.Mesh(
				obj.geometry,
				new THREE.MeshLambertMaterial({color: obj.material.color, opacity:0.7, transparent:true})
			);
			this.AddWireframe(this.moving);
			this.moving.oldColorValue=obj.material.color;
			this.scene.add(this.moving);

			let pos=this.GetWorldPositionByMouse(e);
			
			this.moving.position.x=pos.x;
			this.moving.position.y=pos.y;

			this.renderer.domElement.style.zIndex = '950';

			this.mode='NEW';
		}
	}
	OnPointerUp(e) {
		this.renderer.domElement.style.zIndex = '800';

		if(this.mode=='NEW'){
			this.mode='NONE';
			this.objects.push(this.moving);
			return;
		}
		
		this.pointer.set(
			(e.pageX / this.renderer.domElement.clientWidth) * 2 - 1,
			-(e.pageY / this.renderer.domElement.clientHeight) * 2 + 1
		);

		upred.f3d.removeButton.tag.style.display='none';

		this.raycaster.setFromCamera(this.pointer, this.camera);
		const intersects = this.raycaster.intersectObjects(this.objects, false);

		if(this.lastSelected){
			this.lastSelected.material.color=this.lastSelected.oldColorValue;
			this.lastSelected=null;
			this.control.detach();
			this.transformTarget=null;
		}
		if (intersects.length > 0) {			
			this.lastSelected=intersects[0].object;
			this.lastSelected.material.color=new THREE.Color(0x2874A6);
			upred.f3d.removeButton.tag.style.display='block';

			this.control.attach(this.lastSelected);
			this.transformTarget=this.lastSelected;
		}
		if(this.mode=='MOVE'){
			this.mode='NONE';
			this.oldPosition=null;
			return;
		}		
	}
	RenderScene() {
		//this.controls.update();
		this.paletteRenderer.render(this.paletteScene, this.paletteCamera);
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.RenderScene.bind(this));
	}
	ToRadian(degree) {
		return Math.PI * (degree / 180);
	}
    RemoveObject(){
        this.mode='NONE';
		
        upred.ui.uiModule.SelectButton(null);
        //upred.ui.uiModule.SelectButton(upred.blocks.removeButton);

		if(this.lastSelected){			
			this.objects.splice(this.objects.indexOf(this.lastSelected), 1);
			this.scene.remove(this.lastSelected);
			this.lastSelected=null;
		}
    }
	ChangeColor(c){
		let h=c.replace(/[^\d,]/g,"").split(",");
		let hs="#"+((1<<24)+(+h[0]<<16)+(+h[1]<<8)+ +h[2]).toString(16).slice(1);
		const ccode=parseInt(hs.substr(1), 16);
		const cmat = new THREE.MeshLambertMaterial({
			color: ccode,
		});
		if(this.lastSelected){
			this.lastSelected.material=cmat;
			this.lastSelected.oldColorValue=this.lastSelected.material.color;
			this.lastSelected=null;
		}
	}
}

upred.f3d = {
	removeButton: null,
	Startup: function () {
		let f3d = new Figures3D();
		let buttons = {
			removeObj: {
				img: '../common/asset/bt_delete.svg',
				txt: '제거',
				handler: f3d.RemoveObject.bind(f3d),
			}
		};
        upred.f3d.removeButton=buttons.removeObj;
		let ui = new upred.ui.CommonUI().StartCustom(buttons);
		upred.ui.mathModule = {};
		upred.ui.mathModule.ChangeColorHandler=f3d.ChangeColor.bind(f3d);
		upred.ui.mathModule.EnableInteraction = function () {
			for (let i = 0; i < f3d.areaTag.children.length; i++) {
				f3d.areaTag.children[i].style.pointerEvents = 'none';
			}
			f3d.renderer.domElement.style.pointerEvents = 'auto';
			f3d.renderer.domElement.style.zIndex = '800';
			f3d.areaTag.appendChild(blocks.renderer.domElement);
			f3d.mode='none';
		};
		upred.ui.mathModule.DisableInteraction = function () {
			for (let i = 0; i < f3d.areaTag.children.length; i++) {
				f3d.areaTag.children[i].style.pointerEvents = 'auto';
			}
			f3d.renderer.domElement.style.pointerEvents = 'none';
			f3d.renderer.domElement.style.zIndex = '10';
			f3d.areaTag.insertBefore(
				f3d.renderer.domElement,
				f3d.areaTag.firstChild
			);
			f3d.mode='none';
		};

		for (let i = 0; i < f3d.areaTag.children.length; i++) {
			f3d.areaTag.children[i].style.pointerEvents = 'none';
		}
		upred.f3d.removeButton.tag.style.display='none';
		f3d.renderer.domElement.style.pointerEvents = 'auto';
		f3d.renderer.domElement.style.zIndex = '800';
		f3d.areaTag.appendChild(f3d.renderer.domElement);
		f3d.paletteRenderer.domElement.style.pointerEvents = 'auto';
		f3d.paletteRenderer.domElement.style.zIndex = '900';
		f3d.paletteTag.appendChild(f3d.paletteRenderer.domElement);
		f3d.RenderScene();

		upred.ui.GuideViewer.Show('./asset/guide.png');
	},
};
upred.f3d.Startup();
