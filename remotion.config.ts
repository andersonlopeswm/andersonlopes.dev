import { Config } from "@remotion/cli/config";

// Configuração padrão de render para Instagram (H.264 + JPEG nos frames).
Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
Config.setOverwriteOutput(true);
