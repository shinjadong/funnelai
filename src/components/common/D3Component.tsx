import { useEffect, useCallback, useState } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

interface Node {
  id: string;
  name: string;
  value: number;
  gender?: string;
  icon?: string;
  color?: string;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  index?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  value: number;
  color?: string;
  width?: number;
}

interface D3ComponentProps {
  chartRef: React.RefObject<SVGSVGElement>;
  data: {
    nodes: Node[];
    links: Link[];
  };
  onNodeClick?: (node: Node) => void;
}

const D3Component = ({ chartRef, data, onNodeClick }: D3ComponentProps) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [simulation, setSimulation] = useState<any>(null);

  const initializeZoom = useCallback((svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        svg.select('g').attr('transform', event.transform.toString());
      });

    svg.call(zoom);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    const width = chartRef.current.clientWidth || 800;
    const height = chartRef.current.clientHeight || 600;

    svg.selectAll("*").remove();

    // Add zoom container
    const container = svg.append('g');

    // Initialize zoom
    initializeZoom(svg);

    // Prepare data for Sankey diagram
    const sankeyData = {
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({
        ...d,
        source: data.nodes.findIndex(n => n.id === (typeof d.source === 'string' ? d.source : d.source.id)),
        target: data.nodes.findIndex(n => n.id === (typeof d.target === 'string' ? d.target : d.target.id))
      }))
    };

    try {
      const sankeyGenerator = sankey()
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 1], [width - 1, height - 5]]);

      const { nodes, links } = sankeyGenerator(sankeyData);

      // Create gradients
      const defs = container.append("defs");
      links.forEach((link, i) => {
        const gradientId = `gradient-${i}`;
        const gradient = defs
          .append("linearGradient")
          .attr("id", gradientId)
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", link.source.x1)
          .attr("x2", link.target.x0);

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#A4A1CB");

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#CCCAE4");
      });

      // Draw links
      container
        .append("g")
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke", (d, i) => `url(#gradient-${i})`)
        .attr("stroke-width", d => Math.max(1, d.width || 0))
        .attr("fill", "none")
        .attr("opacity", 0.7);

      // Draw nodes
      const node = container
        .append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("class", "node")
        .style("cursor", "pointer")
        .on("click", (event, d) => onNodeClick?.(d))
        .on("mouseover", function() {
          d3.select(this)
            .select("rect")
            .attr("opacity", 1)
            .attr("filter", "drop-shadow(0 0 3px rgba(0,0,0,0.3))");
        })
        .on("mouseout", function() {
          d3.select(this)
            .select("rect")
            .attr("opacity", 0.8)
            .attr("filter", null);
        });

      // Add node background
      node
        .append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", d => d.color || (d.index! % 2 === 0 ? "#A4A1CB" : "#CCCAE4"))
        .attr("opacity", 0.8)
        .attr("rx", 4)
        .attr("ry", 4);

      // Add icons
      node
        .append("text")
        .attr("x", d => (d.x0! + d.x1!) / 2)
        .attr("y", d => d.y0! + 20)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "16px")
        .text(d => d.icon || "");

      // Add labels
      node
        .append("text")
        .attr("x", d => (d.x0! + d.x1!) / 2)
        .attr("y", d => (d.y0! + d.y1!) / 2 + 10)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => d.name)
        .attr("fill", "#ffffff")
        .attr("font-size", "12px")
        .attr("font-weight", "500");

      // Add value labels
      node
        .append("text")
        .attr("x", d => (d.x0! + d.x1!) / 2)
        .attr("y", d => (d.y0! + d.y1!) / 2 + 30)
        .attr("text-anchor", "middle")
        .text(d => d.value.toLocaleString())
        .attr("fill", "#ffffff")
        .attr("font-size", "11px")
        .attr("opacity", 0.8);
    } catch (error) {
      console.error('Error rendering Sankey diagram:', error);
    }
  }, [chartRef, data, initializeZoom, onNodeClick]);

  return null;
};

export default D3Component;
