import { Component, Input, OnInit } from "@angular/core";
import { FilterPipe } from "../../../../_pipes/filter.pipe";
import { LineBreakFormatterPipe } from "../../../../_pipes/line-break-formatter.pipe";
import { UtilService } from "../../../../_services/util.service";
import { MarkdownService } from "ngx-md";

@Component({
  selector: "app-tree-rules",
  templateUrl: "./tree-rules.component.html",
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class TreeRulesComponent implements OnInit {
  @Input() forest: any;

  constructor(
    private filter: FilterPipe,
    private lineBreakFormatter: LineBreakFormatterPipe,
    public util: UtilService,
    private markdown: MarkdownService
  ) {}

  ngOnInit() {
    if (this.forest) {
      this.markdown.renderer.text = (text: string) => {
        return text
          .replace("TREEHEIGHT", this.forest.treeHeight)
          .replace("STUMPHEIGHT", this.forest.stumpHeight)
          .replace("STUMPDIAMETER", this.forest.stumpDiameter);
      };
    }
  }
}
