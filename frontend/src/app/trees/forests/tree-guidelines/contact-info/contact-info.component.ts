import { Component, Input, OnInit } from '@angular/core';
import { LineBreakFormatterPipe } from '../../../../_pipes/line-break-formatter.pipe';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import { MarkdownService } from 'ngx-md';

@Component({
  selector: 'app-tree-contact-info',
  templateUrl: './contact-info.component.html',
  providers: [LineBreakFormatterPipe, FilterPipe]
})
export class ContactInfoComponent implements OnInit {
  @Input() forest: any;

  constructor(
    private filter: FilterPipe,
    private lineBreakFormatter: LineBreakFormatterPipe,
    public markdown: MarkdownService
  ) {}

  ngOnInit() {
    this.markdown.setMarkedOptions({
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });

    this.markdown.renderer.heading = (text, level) => {
      return `<h${level}>${text}</h${level}>`;
    };

  }
}
