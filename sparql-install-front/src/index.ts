import { IRenderMime } from '@jupyterlab/rendermime-interfaces';

import { Widget } from '@lumino/widgets';

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'application/vnd.my_organization.my_type';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-my_type';

/**
 * A widget for rendering my_type.
 */
export class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render my_type into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const data = model.data[this._mimeType] as string;
    this.node.textContent = data.slice(0, 16384);
    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for my_type data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: (options) => new OutputWidget(options),
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: 'sparql-install-front:plugin',
  rendererFactory,
  rank: 100,
  dataType: 'string',
  fileTypes: [
    {
      name: 'my_type',
      mimeTypes: [MIME_TYPE],
      extensions: ['.my_type'],
    },
  ],
  documentWidgetFactoryOptions: {
    name: 'My Viewer',
    primaryFileType: 'my_type',
    fileTypes: ['my_type'],
    defaultFor: ['my_type'],
  },
};

export default extension;
