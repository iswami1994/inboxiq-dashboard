declare module "funnel-graph-js" {
  interface FunnelGraphData {
    labels: string[];
    subLabels?: string[];
    colors: string[][];
    values: number[][];
  }

  interface FunnelGraphOptions {
    container: HTMLElement | string;
    gradientDirection?: "horizontal" | "vertical";
    data: FunnelGraphData;
    displayPercent?: boolean;
    direction?: "horizontal" | "vertical";
    width?: number;
    height?: number;
    subLabelValue?: "percent" | "values";
  }

  export default class FunnelGraph {
    constructor(options: FunnelGraphOptions);
    draw(): void;
    destroy(): void;
  }
}

declare module "funnel-graph-js/dist/css/main.min.css";
declare module "funnel-graph-js/dist/css/theme.min.css";
