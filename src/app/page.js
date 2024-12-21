'use client'

import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
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
    const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // 親キューブの作成
    const parentCube = new THREE.Mesh(geometry, parentMaterial);

    // 子キューブの作成
    const cube = new THREE.Mesh(geometry, material);

    // 親キューブに子キューブを追加
    parentCube.add(cube);
    parentCube.position.set(-3, 0, 0); // 親キューブの位置設定

    // 子キューブの位置設定
    cube.position.set(3, 0, 0);
    // スケールの拡大
    // parentCube.scale.set(2, 2, 2)
    // cube.scale.set(2, 2, 2)
    // キューブの回転
    cube.rotation.x = Math.PI / 4;

    // 親キューブをシーンに追加
    scene.add(parentCube);

    // カメラの位置設定
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 2;
    camera.lookAt(0, 0, 0);

    // 座標軸の表示
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 座標コントローラーの作成
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true; // 慣性を有効にする
    controls.dampingFactor = 0.09; // 慣性の摩擦指数

    // アニメーション関数
    function animate() {
      controls.update(); // 毎フレームコントロールを更新
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix()
    })

    let eventObj = {
      Fullscreen: function () {
        document.body.requestFullscreen();
      },
      ExitFullscreen: function () {
        document.exitFullscreen()
      },
    }
    const gui = new GUI();
    gui.add(eventObj, 'Fullscreen').name('フルスクリーン');
    gui.add(eventObj, 'ExitFullscreen').name('退出');

  }, []);

  return (
    <div className={styles.page}>
      <h1>3Dキューブのデモ</h1>
      {/* <canvas>タグを表示する */}
      <canvas ref={canvasRef} style={{ display: "block" }}></canvas>
    </div>
  );
}
