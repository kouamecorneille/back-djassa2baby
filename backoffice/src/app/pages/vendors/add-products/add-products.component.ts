import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-add-products',
  standalone: true,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;


  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  constructor() { }

  ngOnInit(): void {
    this.initThree();
  }

  private initThree(): void {
    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = this.canvasContainer.nativeElement.clientHeight;

    // Créer une scène
    this.scene = new THREE.Scene();

    // Créer une caméra
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 5);

    // Créer un rendu WebGL
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    // Ajouter le rendu au DOM
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Exemple : ajouter une forme géométrique
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    // Animation de la scène
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
}
