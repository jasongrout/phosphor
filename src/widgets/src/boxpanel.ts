/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2016, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
import {
  BoxLayout
} from './boxlayout';

import {
  Panel
} from './panel';

import {
  Widget
} from './widget';


/**
 * A panel which arranges its widgets in a single row or column.
 *
 * #### Notes
 * This class provides a convenience wrapper around a [[BoxLayout]].
 */
export
class BoxPanel extends Panel {
  /**
   * Construct a new box panel.
   *
   * @param options - The options for initializing the box panel.
   */
  constructor(options: BoxPanel.IOptions = {}) {
    super({ layout: Private.createLayout(options) });
    this.addClass(BoxPanel.BOX_PANEL_CLASS);
  }

  /**
   * Get the layout direction for the box panel.
   */
  get direction(): BoxPanel.Direction {
    return (this.layout as BoxLayout).direction;
  }

  /**
   * Set the layout direction for the box panel.
   */
  set direction(value: BoxPanel.Direction) {
    (this.layout as BoxLayout).direction = value;
  }

  /**
   * Get the inter-element spacing for the box panel.
   */
  get spacing(): number {
    return (this.layout as BoxLayout).spacing;
  }

  /**
   * Set the inter-element spacing for the box panel.
   */
  set spacing(value: number) {
    (this.layout as BoxLayout).spacing = value;
  }

  /**
   * A message handler invoked on a `'child-added'` message.
   */
  protected onChildAdded(msg: Widget.ChildMessage): void {
    msg.child.addClass(BoxPanel.CHILD_CLASS);
  }

  /**
   * A message handler invoked on a `'child-removed'` message.
   */
  protected onChildRemoved(msg: Widget.ChildMessage): void {
    msg.child.removeClass(BoxPanel.CHILD_CLASS);
  }
}


/**
 * The namespace for the `BoxPanel` class statics.
 */
export
namespace BoxPanel {
  /**
   * The class name added to BoxPanel instances.
   */
  export
  const BOX_PANEL_CLASS = 'p-BoxPanel';

  /**
   * The class name added to a BoxPanel child.
   */
  export
  const CHILD_CLASS = 'p-BoxPanel-child';

  /**
   * The class name added to left-to-right box panels.
   */
  export
  const LEFT_TO_RIGHT_CLASS = BoxLayout.LEFT_TO_RIGHT_CLASS;

  /**
   * The class name added to right-to-left box panels.
   */
  export
  const RIGHT_TO_LEFT_CLASS = BoxLayout.RIGHT_TO_LEFT_CLASS;

  /**
   * The class name added to top-to-bottom box panels.
   */
  export
  const TOP_TO_BOTTOM_CLASS = BoxLayout.TOP_TO_BOTTOM_CLASS;

  /**
   * The class name added to bottom-to-top box panels.
   */
  export
  const BOTTOM_TO_TOP_CLASS = BoxLayout.BOTTOM_TO_TOP_CLASS;

  /**
   * A type alias for a box panel direction.
   */
  export
  type Direction = BoxLayout.Direction;

  /**
   * An options object for initializing a box panel.
   */
  export
  interface IOptions {
    /**
     * The layout direction of the panel.
     *
     * The default is `'top-to-bottom'`.
     */
    direction?: Direction;

    /**
     * The spacing between items in the panel.
     *
     * The default is `4`.
     */
    spacing?: number;

    /**
     * The box layout to use for the box panel.
     *
     * If this is provided, the other options are ignored.
     *
     * The default is a new `BoxLayout`.
     */
    layout?: BoxLayout;
  }

  /**
   * Get the box panel stretch factor for the given widget.
   *
   * @param widget - The widget of interest.
   *
   * @returns The box panel stretch factor for the widget.
   */
  export
  function getStretch(widget: Widget): number {
    return BoxLayout.getStretch(widget);
  }

  /**
   * Set the box panel stretch factor for the given widget.
   *
   * @param widget - The widget of interest.
   *
   * @param value - The value for the stretch factor.
   */
  export
  function setStretch(widget: Widget, value: number): void {
    BoxLayout.setStretch(widget, value);
  }

  /**
   * Get the box panel size basis for the given widget.
   *
   * @param widget - The widget of interest.
   *
   * @returns The box panel size basis for the widget.
   */
  export
  function getSizeBasis(widget: Widget): number {
    return BoxLayout.getSizeBasis(widget);
  }

  /**
   * Set the box panel size basis for the given widget.
   *
   * @param widget - The widget of interest.
   *
   * @param value - The value for the size basis.
   */
  export
  function setSizeBasis(widget: Widget, value: number): void {
    BoxLayout.setSizeBasis(widget, value);
  }
}


/**
 * The namespace for the module implementation details.
 */
namespace Private {
  /**
   * Create a box layout for the given panel options.
   */
  export
  function createLayout(options: BoxPanel.IOptions): BoxLayout {
    return options.layout || new BoxLayout(options);
  }
}
