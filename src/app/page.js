'use client'

import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import styles from "./page.module.css";

export default function Home() {
  const canvasRef = useRef(null); // 描画先を参照するための useRef

  useEffect(() => {
    // シーン(場所)の作成
    const scene = new THREE.Scene();

    // カメラの設定
    const camera = new THREE.PerspectiveCamera(
      45, // 視野角
      window.innerWidth / window.innerHeight, // アスペクト比
      0.1, // 描画距離の最小値
      1000 // 描画距離の最大値
    );

    // 描画オブジェクトの作成
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    // 描画サイズの設定
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 物体の形
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 物体の材質
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 2;
    camera.lookAt(0, 0, 0);

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    // アニメーション関数
    function animate() {
      requestAnimationFrame(animate);

      // キューブを回転させる
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();

    // クリーンアップ関数でリソース解放
    return () => {
      // renderer から canvas を明示的に削除する処理は不要
      // 代わりに、canvasRef が指す DOM 要素がアンマウントされるので、その際に自動的に解放される
    };
  }, []);

  return (
    <div className={styles.page}>
      <h1>3Dキューブのデモ</h1>
      {/* <canvas>タグを表示する */}
      <canvas ref={canvasRef} style={{ display: "block" }}></canvas>
    </div>
  );
}
