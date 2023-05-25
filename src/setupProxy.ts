import { createProxyMiddleware } from "http-proxy-middleware";
import { BASE_URL } from "./configs/config";

const setupProxy = (app: any) => {
    return app.use("/api", createProxyMiddleware({
        target: BASE_URL,
        changeOrigin: true,
    }))
}

export default setupProxy;