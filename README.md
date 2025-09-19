# Object Detection using YOLOv8 and Tensorflow.js

## ✨ Models

The tables below showcase YOLO11 models pretrained on the [COCO](https://docs.ultralytics.com/datasets/detect/coco/) dataset for [Detection](https://docs.ultralytics.com/tasks/detect/).

<details open><summary>Detection (COCO)</summary>

Explore the [Detection Docs](https://docs.ultralytics.com/tasks/detect/) for usage examples. These models are trained on the [COCO dataset](https://cocodataset.org/), featuring 80 object classes.

| Model                                                                                | size<br><sup>(pixels) | mAP<sup>val<br>50-95 | Speed<br><sup>CPU ONNX<br>(ms) | Speed<br><sup>T4 TensorRT10<br>(ms) | params<br><sup>(M) | FLOPs<br><sup>(B) |
| ------------------------------------------------------------------------------------ | --------------------- | -------------------- | ------------------------------ | ----------------------------------- | ------------------ | ----------------- |
| [YOLO11n](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11n.pt) | 640                   | 39.5                 | 56.1 ± 0.8                     | 1.5 ± 0.0                           | 2.6                | 6.5               |
| [YOLO11s](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11s.pt) | 640                   | 47.0                 | 90.0 ± 1.2                     | 2.5 ± 0.0                           | 9.4                | 21.5              |
| [YOLO11m](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11m.pt) | 640                   | 51.5                 | 183.2 ± 2.0                    | 4.7 ± 0.1                           | 20.1               | 68.0              |
| [YOLO11l](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11l.pt) | 640                   | 53.4                 | 238.6 ± 1.4                    | 6.2 ± 0.1                           | 25.3               | 86.9              |
| [YOLO11x](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11x.pt) | 640                   | 54.7                 | 462.8 ± 6.7                    | 11.3 ± 0.2                          | 56.9               | 194.9             |

- **mAP<sup>val</sup>** values refer to single-model single-scale performance on the [COCO val2017](https://cocodataset.org/) dataset. See [YOLO Performance Metrics](https://docs.ultralytics.com/guides/yolo-performance-metrics/) for details. <br>Reproduce with `yolo val detect data=coco.yaml device=0`
- **Speed** metrics are averaged over COCO val images using an [Amazon EC2 P4d](https://aws.amazon.com/ec2/instance-types/p4/) instance. CPU speeds measured with [ONNX](https://onnx.ai/) export. GPU speeds measured with [TensorRT](https://developer.nvidia.com/tensorrt) export. <br>Reproduce with `yolo val detect data=coco.yaml batch=1 device=0|cpu`

</details>

## 📜 License

Ultralytics offers two licensing options to suit different needs:

- **AGPL-3.0 License**: This [OSI-approved](https://opensource.org/license) open-source license is perfect for students, researchers, and enthusiasts. It encourages open collaboration and knowledge sharing. See the [LICENSE](https://github.com/ultralytics/ultralytics/blob/main/LICENSE) file for full details.
- **Ultralytics Enterprise License**: Designed for commercial use, this license allows for the seamless integration of Ultralytics software and AI models into commercial products and services, bypassing the open-source requirements of AGPL-3.0. If your use case involves commercial deployment, please contact us via [Ultralytics Licensing](https://www.ultralytics.com/license).
