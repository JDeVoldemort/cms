import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  document: Document;
  id: string;
  nativeWindow: any;
  constructor( private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    private windRef: WindRefService

  ) {}
  onView() {
    if (this.document.url) {

      window.open(this.document.url);
    }
  }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params ) => {
          this.id = params['id'];
          // this.document = this.documentService.getDocument(this.id);
          // this.documentService.getDocument(this.id).subscribe((document: Document) => {
          //   this.document = document;
          // });
          // console.log(this.documentService.getDocument(this.id))
          this.document = this.documentService.getDocument(this.id);
          return this.documentService.getDocument(this.id);
          // this.documentService.getDocument(this.id).subscribe((document: Document) => {
          //   this.document = document;
          //   console.log(this.document);
          // });
          // console.log(this.id);

        }
      );
  }
  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
