import React from "react";
import ReactDOM from "react-dom";
import ToastManager from "./ToastManager";
import { ThemeProviderWrapper } from "../theme";

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

export default class Toaster {
  constructor() {
    if (!isBrowser) return;

    const container = document.createElement("div");
    container.setAttribute("class", "chakra-toast-container");
    document.body.appendChild(container);

    ReactDOM.render(
      <ThemeProviderWrapper>
        <ToastManager
          bindNotify={this._bindNotify}
          bindGetToasts={this._bindGetToasts}
          bindCloseAll={this._bindCloseAll}
        />
      </ThemeProviderWrapper>,
      container
    );
  }

  _bindNotify = handler => {
    this.notifyHandler = handler;
  };

  _bindGetToasts = handler => {
    this.getToastsHandler = handler;
  };

  _bindCloseAll = handler => {
    this.closeAllHandler = handler;
  };

  getToasts = () => {
    return this.getToastsHandler();
  };

  closeAll = () => {
    return this.closeAllHandler();
  };

  notify = (message, settings = {}) => {
    return this.notifyHandler(message, { ...settings, status: "info" });
  };

  success = (message, settings = {}) => {
    return this.notifyHandler(message, { ...settings, status: "success" });
  };

  warning = (message, settings = {}) => {
    return this.notifyHandler(message, { ...settings, status: "warning" });
  };

  error = (message, settings = {}) => {
    return this.notifyHandler(message, { ...settings, status: "error" });
  };
}
