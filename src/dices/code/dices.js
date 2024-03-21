class UpredDices{
    constructor(){
        this.LoadTextures();
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.cameraLastPos={x:0,y:-0.6,z:3.5,xr:Math.PI/20,yr:0,zr:0};
        this.SetCameraPos();
        this.models=[];
        
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.areaTag=document.getElementById('WORKAREA');
        this.renderer.setSize( this.areaTag.clientWidth, this.areaTag.clientHeight );

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update();

        const colorA = 0xFFFFFF;
        const intensityA = 0.2;
        const lightA = new THREE.AmbientLight(colorA, intensityA);
        this.scene.add(lightA);

        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 1, 10);
        this.scene.add(light);

        this.clock = new THREE.Clock();

       // this.scene.background = new THREE.Color( 0xeeeeee );
        this.rotateX=[];
        this.rotateY=[];
        this.rotateZ=[];
        this.trotateX=[];
        this.trotateY=[];
        this.trotateZ=[];
        this.result=[];
        this.frontFace=[];
        this.rotateCount=0;

        window.addEventListener( 'resize', this.OnWindowResize.bind(this));
        this.AddHexa();
    }
    OnWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.areaTag=document.getElementById('WORKAREA');
        this.renderer.setSize( this.areaTag.clientWidth, this.areaTag.clientHeight );
    }
    SetCameraPos(){
        this.camera.position.x=this.cameraLastPos.x;
        this.camera.position.y=this.cameraLastPos.y;
        this.camera.position.z=this.cameraLastPos.z;
        this.camera.rotation.x=this.cameraLastPos.xr;
        this.camera.rotation.y=this.cameraLastPos.yr;
        this.camera.rotation.z=this.cameraLastPos.zr;
    }
    LoadTextures(){
        this.HT1=new THREE.Texture();
        this.HT1.image=TEXTURE_H1;
        this.HT1.colorSpace = THREE.SRGBColorSpace;
        this.HT1.needsUpdate=true;
        this.HT2=new THREE.Texture();
        this.HT2.image=TEXTURE_H2;
        this.HT2.colorSpace = THREE.SRGBColorSpace;
        this.HT2.needsUpdate=true;
        this.HT3=new THREE.Texture();
        this.HT3.image=TEXTURE_H3;
        this.HT3.colorSpace = THREE.SRGBColorSpace;
        this.HT3.needsUpdate=true;
        this.HT4=new THREE.Texture();
        this.HT4.image=TEXTURE_H4;
        this.HT4.colorSpace = THREE.SRGBColorSpace;
        this.HT4.needsUpdate=true;
        this.HT5=new THREE.Texture();
        this.HT5.image=TEXTURE_H5;
        this.HT5.colorSpace = THREE.SRGBColorSpace;
        this.HT5.needsUpdate=true;
        this.HT6=new THREE.Texture();
        this.HT6.image=TEXTURE_H6;
        this.HT6.colorSpace = THREE.SRGBColorSpace;
        this.HT6.needsUpdate=true;
        
        this.DT1=new THREE.Texture();
        this.DT1.image=TEXTURE_D1;
        this.DT1.colorSpace = THREE.SRGBColorSpace;
        this.DT1.needsUpdate=true;
        this.DT2=new THREE.Texture();
        this.DT2.image=TEXTURE_D2;
        this.DT2.colorSpace = THREE.SRGBColorSpace;
        this.DT2.needsUpdate=true;
        this.DT3=new THREE.Texture();
        this.DT3.image=TEXTURE_D3;
        this.DT3.colorSpace = THREE.SRGBColorSpace;
        this.DT3.needsUpdate=true;
        this.DT4=new THREE.Texture();
        this.DT4.image=TEXTURE_D4;
        this.DT4.colorSpace = THREE.SRGBColorSpace;
        this.DT4.needsUpdate=true;
        this.DT5=new THREE.Texture();
        this.DT5.image=TEXTURE_D5;
        this.DT5.colorSpace = THREE.SRGBColorSpace;
        this.DT5.needsUpdate=true;
        this.DT6=new THREE.Texture();
        this.DT6.image=TEXTURE_D6;
        this.DT6.colorSpace = THREE.SRGBColorSpace;
        this.DT6.needsUpdate=true;
        this.DT7=new THREE.Texture();
        this.DT7.image=TEXTURE_D7;
        this.DT7.colorSpace = THREE.SRGBColorSpace;
        this.DT7.needsUpdate=true;
        this.DT8=new THREE.Texture();
        this.DT8.image=TEXTURE_D8;
        this.DT8.colorSpace = THREE.SRGBColorSpace;
        this.DT8.needsUpdate=true;
        this.DT9=new THREE.Texture();
        this.DT9.image=TEXTURE_D9;
        this.DT9.colorSpace = THREE.SRGBColorSpace;
        this.DT9.needsUpdate=true;
        this.DT10=new THREE.Texture();
        this.DT10.image=TEXTURE_D10;
        this.DT10.colorSpace = THREE.SRGBColorSpace;
        this.DT10.needsUpdate=true;

        this.materialsHexa = [
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.HT4}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.HT2}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.HT5}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.HT6}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.HT1}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.HT3}),
        ];
        this.materialsDeca = [
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT1}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT2}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT3}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT4}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT5}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT6}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT7}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT8}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT9}),
            new THREE.MeshPhongMaterial({color:0xffffff,map: this.DT10}),
        ];
        this.materialGrayed=new THREE.MeshPhongMaterial({color:0xffffff});
    }
    RenderScene() {
        this.Rotate();
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.RenderScene.bind(this) );
    }
    Rotate(){
        const timeDelta = this.clock.getDelta();

        if(this.rotateElapsed<this.rotateCount){
            this.rotateElapsed+=timeDelta;
            for(let i=0;i<this.models.length;i++){
                this.models[i].model.rotation.x+=this.rotateX[i]*timeDelta;
                this.models[i].model.rotation.y+=this.rotateY[i]*timeDelta;
                this.models[i].model.rotation.z+=this.rotateZ[i]*timeDelta;
                this.models[i].model.position.z=(1-this.rotateElapsed)*2;
            }

            this.camera.position.x+=this.cameraRoll.x;
            this.camera.position.y+=this.cameraRoll.y;
            this.camera.position.z+=this.cameraRoll.z;
            this.camera.rotation.x+=this.cameraRoll.xr;
            this.camera.rotation.y+=this.cameraRoll.yr;
            this.camera.rotation.z+=this.cameraRoll.zr;

            if(this.rotateElapsed>=this.rotateCount){
                let rt='';
                let sum=0;
                for(let i=0;i<this.models.length;i++){
                    this.models[i].model.rotation.x=this.trotateX[i];
                    this.models[i].model.rotation.y=this.trotateY[i];
                    this.models[i].model.rotation.z=this.trotateZ[i];
                    if(i>0) rt+='+';
                    rt+=this.result[i];
                    sum+=this.result[i];
                    for(let m=0;m<this.models[i].model.material.length;m++){    
                        if(m!=this.frontFace[i]){
                            this.models[i].model.material[m]=this.materialGrayed;
                        }
                        this.models[i].model.material[m].needsUpdate=true;
                    }
                }
                if(this.models.length>1){
                    rt+=' = ';
                    rt+=sum;
                }

                this.EchoText(rt);
                this.SetCameraPos();
            }
        }
    }
    Roll(){
        let hexN=[1,2,3,4,5,6];
        let hexFN=[4,1,5,0,2,3];
        let decN=[1,2,3,4,5,6,0,9,8,7];
        let decFN=[0,1,2,3,4,5,9,8,7,6];

        for(let i=0;i<this.models.length;i++){
            if(this.models[i].type=='hexa'){
                let n=Math.floor(Math.random()*6); //0~5
                this.trotateY[i]=(n<4)?(n*Math.PI/2):0;
                this.trotateX[i]=0;
                this.trotateZ[i]=0;
                if(n==4) this.trotateX[i]+=Math.PI/2;
                else if(n==5) this.trotateX[i]+=Math.PI/2*3;

                let m=Math.floor(Math.random()*2)+1;
                this.rotateX[i]=this.trotateX[i]+m*Math.PI*2;
                this.rotateY[i]=this.trotateY[i]-m/2*Math.PI*2;
                this.rotateZ[i]=0;
                this.models[i].model.rotation.x=0;
                this.models[i].model.rotation.y=0;
                this.frontFace[i]=hexFN[n];
                this.result[i]=hexN[n];
                for(let k=0;k<this.models[i].model.material.length;k++){    
                    this.models[i].model.material[k]=this.materialsHexa[k];
                    this.models[i].model.material[k].needsUpdate=true;
                }
            }else if(this.models[i].type=='deca'){
                let n=Math.floor(Math.random()*10); //0~9
                let xn=n%5;
                this.trotateX[i]=Math.PI/5;
                this.trotateY[i]=xn*(Math.PI/2.5);
                if(n>=5) this.trotateY[i]-=Math.PI*0.2;
                this.trotateZ[i]=(n<5)?0:Math.PI;

                let m=Math.floor(Math.random()*2)+1;
                this.rotateX[i]=0;
                this.rotateY[i]=this.trotateY[i]+m*Math.PI*2;
                this.rotateZ[i]=this.trotateZ[i]+m/2*Math.PI*2;
                this.models[i].model.rotation.x=Math.PI/5;
                this.models[i].model.rotation.y=0;
                this.frontFace[i]=decFN[n];
                this.result[i]=decN[n];

                for(let k=0;k<this.models[i].model.material.length;k++){    
                    this.models[i].model.material[k]=this.materialsDeca[k];
                    this.models[i].model.material[k].needsUpdate=true;
                }
            }
            //this.rotateX[i]/=60;
            //this.rotateY[i]/=60;
            //this.rotateZ[i]/=60;
        }

        this.cameraRoll={
            x:(this.cameraLastPos.x-this.camera.position.x)/60,
            y:(this.cameraLastPos.y-this.camera.position.y)/60,
            z:(this.cameraLastPos.z-this.camera.position.z)/60,
            xr:(this.cameraLastPos.xr-this.camera.rotation.x)/60,
            yr:(this.cameraLastPos.yr-this.camera.rotation.x)/60,
            zr:(this.cameraLastPos.zr-this.camera.rotation.x)/60,
        }
        this.EchoText('');
        this.rotateCount=1;
        this.rotateElapsed=0;
    }
    EchoText(txt){
        let ca=document.getElementById('CAPTIONAREA');
        ca.textContent=txt;
    }
    ShowSum(){
        let ca=document.getElementById('CAPTIONAREA');
        if(ca.style.display=='block'){
            ca.style.display='none';
            upred.ui.uiModule.SelectButton(null);
        }else{
            ca.style.display='block';
            upred.ui.uiModule.SelectButton(upred.dices.sumButton);
        }
    }
    AddHexa(){
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        //const material = new THREE.MeshPhongMaterial( { color: 0xeeeeee } );
        let cube = new THREE.Mesh( geometry, this.materialsHexa.slice());

        if(this.models.length==1&&this.models[0].type=='deca'){
            this.scene.remove(this.models[0].model);
            this.models=[];
            this.trotateX=[];
            this.trotateY=[];
            this.cameraLastPos={x:0,y:-0.6,z:3.5,xr:Math.PI/20,yr:0,zr:0};
            this.SetCameraPos();
        }else{
            for(let i=0;i<this.models.length;i++){
                this.models[i].model.position.x-=0.7;
            }
            cube.position.x=this.models.length*0.7;
            if(this.models.length>4){
                this.cameraLastPos.z+=0.6;
                this.SetCameraPos();
            }
        }
        this.scene.add( cube );
        this.models.push({model:cube,type:'hexa'});
        this.trotateX.push(0);
        this.trotateY.push(0);
    }
    ToRadian(degree){
        return Math.PI*(degree/180);
    }
    AddDeca(){
        const height=0.8;
        const radius=0.6;
        const polyN=5;
        const geometry = new THREE.BufferGeometry();
        const unitDeg=360/polyN;
        const yDelta=0.085;
        let upper=[];
        let lower=[];
        for(let i=0;i<polyN;i++){
            upper.push({x:Math.cos(this.ToRadian(unitDeg*i-90))*radius, y:yDelta, z:Math.sin(this.ToRadian(unitDeg*i-90))*radius});
            lower.push({x:Math.cos(this.ToRadian(unitDeg*i-90+unitDeg/2))*radius, y:-yDelta, z:Math.sin(this.ToRadian(unitDeg*i-90+unitDeg/2))*radius});
        }

        const vertices = new Float32Array( [
            0,height,0,
            upper[3].x,upper[3].y,upper[3].z,
            upper[2].x,upper[2].y,upper[2].z,
            upper[3].x,upper[3].y,upper[3].z,
            lower[2].x,lower[2].y,lower[2].z,
            upper[2].x,upper[2].y,upper[2].z,
            
            0,height,0,
            upper[4].x,upper[4].y,upper[4].z,
            upper[3].x,upper[3].y,upper[3].z,
            upper[4].x,upper[4].y,upper[4].z,
            lower[3].x,lower[3].y,lower[3].z,
            upper[3].x,upper[3].y,upper[3].z,

            0,height,0,
            upper[0].x,upper[0].y,upper[0].z,
            upper[4].x,upper[4].y,upper[4].z,
            upper[0].x,upper[0].y,upper[0].z,
            lower[4].x,lower[4].y,lower[4].z,
            upper[4].x,upper[4].y,upper[4].z,
            
            0,height,0,
            upper[1].x,upper[1].y,upper[1].z,
            upper[0].x,upper[0].y,upper[0].z,
            upper[1].x,upper[1].y,upper[1].z,
            lower[0].x,lower[0].y,lower[0].z,
            upper[0].x,upper[0].y,upper[0].z,

            0,height,0,
            upper[2].x,upper[2].y,upper[2].z,
            upper[1].x,upper[1].y,upper[1].z,
            upper[2].x,upper[2].y,upper[2].z,
            lower[1].x,lower[1].y,lower[1].z,
            upper[1].x,upper[1].y,upper[1].z,


            0,-height,0,
            lower[2].x,lower[2].y,lower[2].z,
            lower[3].x,lower[3].y,lower[3].z,
            lower[2].x,lower[2].y,lower[2].z,
            upper[3].x,upper[3].y,upper[3].z,
            lower[3].x,lower[3].y,lower[3].z,

            0,-height,0,
            lower[3].x,lower[3].y,lower[3].z,
            lower[4].x,lower[4].y,lower[4].z,
            lower[3].x,lower[3].y,lower[3].z,
            upper[4].x,upper[4].y,upper[4].z,
            lower[4].x,lower[4].y,lower[4].z,
            
            0,-height,0,
            lower[4].x,lower[4].y,lower[4].z,
            lower[0].x,lower[0].y,lower[0].z,
            lower[4].x,lower[4].y,lower[4].z,
            upper[0].x,upper[0].y,upper[0].z,
            lower[0].x,lower[0].y,lower[0].z,
            
            0,-height,0,
            lower[0].x,lower[0].y,lower[0].z,
            lower[1].x,lower[1].y,lower[1].z,
            lower[0].x,lower[0].y,lower[0].z,
            upper[1].x,upper[1].y,upper[1].z,
            lower[1].x,lower[1].y,lower[1].z,
            
            0,-height,0,
            lower[1].x,lower[1].y,lower[1].z,
            lower[2].x,lower[2].y,lower[2].z,
            lower[1].x,lower[1].y,lower[1].z,
            upper[2].x,upper[2].y,upper[2].z,
            lower[2].x,lower[2].y,lower[2].z,
        ] );
        
        
        geometry.setAttribute( 'position', new THREE.BufferAttribute(vertices,3));
        let uvs=[];
        for(let i=0;i<10;i++){
            uvs.push(0.5);
            uvs.push(1.4);
            uvs.push(-0.2);
            uvs.push(0.3);            
            uvs.push(1.2);
            uvs.push(0.3);
            
            uvs.push(-0.2);
            uvs.push(0.3);  
            uvs.push(0.5);
            uvs.push(-0.1);          
            uvs.push(1.2);
            uvs.push(0.3);
        }

        geometry.setAttribute( 'uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
        geometry.attributes.uv.needsUpdate = true;

        for(let i=0;i<10;i++){
            geometry.addGroup(6*i,6,i);
        }
        geometry.computeVertexNormals();

        const deca = new THREE.Mesh( geometry, this.materialsDeca.slice());

        if(this.models.length==1&&this.models[0].type=='hexa'){
            this.scene.remove(this.models[0].model);
            this.models=[];
            this.trotateX=[];
            this.trotateY=[];
            this.cameraLastPos={x:0,y:-0.6,z:3.5,xr:Math.PI/20,yr:0,zr:0};
            this.SetCameraPos();
        }else{
            for(let i=0;i<this.models.length;i++){
                this.models[i].model.position.x-=0.7;
            }
            deca.position.x=this.models.length*0.7;
            if(this.models.length>4){
                this.cameraLastPos.z+=0.6;
                this.SetCameraPos();
            }
        }
        deca.rotation.x=Math.PI/5;
        this.scene.add( deca );
        this.models.push({model:deca,type:'deca'});
        this.trotateX.push(0);
        this.trotateY.push(0);
    }
}

upred.dices={
    sumButton:null,
    Startup:function(){
        let upDices=new UpredDices();
        let buttons={
            showSum:{
                img: './asset/icon_sum.png',
                txt: '합계보기',
                handler: upDices.ShowSum.bind(upDices)
            },
            addDeca:{
                img: './asset/icon_decahedron.svg',
                txt: '십면주사위',
                handler: upDices.AddDeca.bind(upDices)
            },
            addHexa:{
                img: './asset/icon_hexahedron.svg',
                txt: '육면주사위',
                handler: upDices.AddHexa.bind(upDices)
            },
            roll:{
                img: './asset/icon_roll.png',
                txt: '굴리기',
                handler: upDices.Roll.bind(upDices)
            }
        };
        upred.dices.sumButton=buttons.showSum;
        let ui=new upred.ui.CommonUI().StartCustom(buttons);
        upred.ui.mathModule={};
        upred.ui.mathModule.EnableInteraction=function(){
            for(let i=0;i<upDices.areaTag.children.length;i++){
                upDices.areaTag.children[i].style.pointerEvents='none';
            }
            upDices.renderer.domElement.style.pointerEvents='auto';
            upDices.renderer.domElement.style.zIndex='800';
            upDices.areaTag.appendChild( upDices.renderer.domElement );
        };
        upred.ui.mathModule.DisableInteraction=function(){
            for(let i=0;i<upDices.areaTag.children.length;i++){
                upDices.areaTag.children[i].style.pointerEvents='auto';
            }
            upDices.renderer.domElement.style.pointerEvents='none';
            upDices.renderer.domElement.style.zIndex='10';
            upDices.areaTag.insertBefore( upDices.renderer.domElement,upDices.areaTag.firstChild );
        };

        
        for(let i=0;i<upDices.areaTag.children.length;i++){
            upDices.areaTag.children[i].style.pointerEvents='none';
        }
        upDices.renderer.domElement.style.pointerEvents='auto';
        upDices.renderer.domElement.style.zIndex='800';
        upDices.areaTag.appendChild( upDices.renderer.domElement );
        upDices.RenderScene();
        upred.ui.GuideViewer.Show('./asset/guide.png');
    }
};
upred.dices.Startup();