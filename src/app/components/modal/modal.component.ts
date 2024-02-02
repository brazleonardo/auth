import {
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';

import { TemplatePortal } from '@angular/cdk/portal';

export const MODAL_DEFAULT_OPTIONS: OverlayConfig = {
  positionStrategy: new GlobalPositionStrategy()
    .centerHorizontally()
    .centerVertically(),
  hasBackdrop: true,
  panelClass: 'modal-panel',
  minWidth: '524px',
};

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  private overlayRef!: OverlayRef;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private overlay: Overlay
  ) {}

  public open() {
    this.overlayRef = this.overlay.create({
      ...MODAL_DEFAULT_OPTIONS,
    });

    const containerModal = new TemplatePortal(
      this.modalTemplate,
      this._viewContainerRef
    );

    this.overlayRef.attach(containerModal);

    return this.overlayRef;
  }

  public close() {
    this.overlayRef.dispose();
  }
}
