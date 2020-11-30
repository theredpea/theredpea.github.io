---
layout: post
title:  "Learning three.js"
date:   2020-11-27 11:45:30 -0700
excerpt_separator: <!--more-->
---

After learning how to use SketchUp, I wanted to learn more about rendering 3D using Javascript. [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) is one of the most popular 3D libraries for the browser/WebGL. Read on to learn the basics

<!--more-->

# Scene Basics

As seen in three.js' ["Creating a Scene"](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene);  three.js needs 3 things:
 1. Renderer
 2. Scene
 3. Camera

These 3 things are the view (renderer), the viewed (scene), and the viewer (camera); the 3 components work together with the line: 

    renderer.render(scene, camera)


## Renderer
A renderer will create/ "render" the 3D image i.e. the "view" that we see in our browsers. Create a renderer, then set its size. The renderer's `domElement` is added to the browser so we can see the "view".

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

## Scene
A scene will contain the 3D objects we're drawing i.e. the objects being "viewed". Creating a scene is very basic, no arguments required for the constructor:

    const scene = new THREE.Scene();

## Camera
A camera will be the perspective of the viewer; i.e. the "viewer". A common camera is the PerspectiveCamera: Create a camera using the arguments in its constructor:

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

We can change the camera's position like this (by default the camera starts at position 0, 0, 0)

    camera.position.z = 5;

### PerspectiveCamera arguments 
The arguments in the constructor include:
  1. Field of View (FOV) 
  2. Aspect Ratio
  3. Near Clipping Plane
  4. Far Clipping Plane

## Other Cameras
Read about [other cameras here](https://threejs.org/docs/#api/en/cameras/Camera); some cameras include;

 - `ArrayCamera`
 - `CubeCamera`
 - `OrthographicCamera`


# Geometry Basics
There is another combination of 3 items that are essential in three.js:

 1. Mesh
 2. Geometry
 3. Material


These 3 "geometry" components work together with the line: 

    const cube = new THREE.Mesh(geometry, material)

The resulting mesh object can be added to the scene like this: 

    scene.add(cube);

## Mesh
Mesh is an object that
 > Takes geometry and applies a material to it

## Geometry
Geometry is the 3D "shape".
    const geometry = new THREE.BoxGeometry();

### Other Geometries

 - `CircleGeometry`
 - `PlanGeometry`
 - `BufferGeometry`
   - Used for lines
 - `TextGeometry`


## Material
Material is the "surface";

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });


### Other Materials
Above we use the `THREE.MeshBasicMaterial`, but there are other types of material, including:
 - `LineBasicMaterial`
   - Used for lines
 - `ShadowMaterial`
 - `SpriteMaterial`


# Learning
The documentation for three.js is thorough, there are many examples but few tutorials.

 - Check out the [Red Stapler](https://www.youtube.com/watch?v=cp-H_6VODko&feature=emb_logo) videos

# Other Browser-based 3D Libraries
 - [babylon.js](https://www.babylonjs.com/); here's an article on [three.js vs babylon.js](https://medium.com/javascript-in-plain-english/webgl-frameworks-three-js-vs-babylon-js-36975d915694)
