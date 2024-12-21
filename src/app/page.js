'use client';

import React, { useEffect } from "react";
import * as THREE from 'three';
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    // 場所を作る
    const scene = new THREE.Scene();
    
    // カメラを作る
    const camera = new THREE.PerspectiveCamera(
      45, // 画角
      window.innerWidth / window.innerHeight, // スクリーンの縦横比
      0.1, // 描画距離の最小値
      1000 // 描画距離の最大値
    );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // 物体の形
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 物体の材質
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    camera.position.z = 5;
    
    function animate() {
      requestAnimationFrame(animate);
      
      // キューブを回転させる
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    }
    
    animate();

    // クリーンアップ関数でリソース解放
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={styles.page}>
      <h1>3Dキューブのデモ</h1>
    </div>
  );
}
