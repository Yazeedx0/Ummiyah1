/**
 * Utility for managing persistent text selections
 */

interface PersistentSelection {
  id: string;
  text: string;
  range: Range;
  marker?: HTMLElement;
}

class SelectionManager {
  private selections: PersistentSelection[] = [];
  private container: HTMLElement | null = null;

  // Initialize with container element
  initialize(containerSelector: string) {
    this.container = document.querySelector(containerSelector);
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.container) return;

    // Handle mouseup to detect selections
    this.container.addEventListener('mouseup', () => {
      this.captureSelection();
    });

    // Prevent selection clear when clicking inside the container
    this.container.addEventListener('mousedown', (e) => {
      // Don't prevent default for links, inputs, buttons
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.closest('[data-selection-popup]');

      if (!isClickable) {
        // Allow selection but prevent existing selections from being cleared
        if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
        }
      }
    });
  }

  // Create a new selection
  private captureSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

    // Get the selected text
    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();

    if (!text || !this.container?.contains(range.commonAncestorContainer)) return;

    // Create a persistent selection
    const id = `selection-${Date.now()}`;
    this.selections.push({
      id,
      text,
      range: range.cloneRange()
    });

    // Mark the selection
    this.highlightSelection(this.selections[this.selections.length - 1]);

    // Keep browser selection active
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Highlight a selection
  private highlightSelection(selection: PersistentSelection) {
    // Create a highlighting span
    const span = document.createElement('span');
    span.className = 'persistent-selection';
    span.dataset.selectionId = selection.id;
    span.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
    span.style.borderRadius = '3px';

    // Replace the range with our highlighting span
    const { range } = selection;
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);

    // Update the selection object with the marker
    selection.marker = span;
  }

  // Remove a specific selection
  removeSelection(id: string) {
    const index = this.selections.findIndex(s => s.id === id);
    if (index === -1) return;

    const selection = this.selections[index];

    // Remove highlighting
    if (selection.marker && selection.marker.parentNode) {
      const parent = selection.marker.parentNode;
      while (selection.marker.firstChild) {
        parent.insertBefore(selection.marker.firstChild, selection.marker);
      }
      parent.removeChild(selection.marker);
    }

    // Remove from our list
    this.selections.splice(index, 1);
  }

  // Clear all selections
  clearAllSelections() {
    // Make a copy because we're modifying as we iterate
    const selectionsCopy = [...this.selections];
    selectionsCopy.forEach(selection => {
      this.removeSelection(selection.id);
    });

    // Also clear browser selection
    window.getSelection()?.removeAllRanges();
  }

  // Get all current selections
  getSelections(): PersistentSelection[] {
    return [...this.selections];
  }
}

export const selectionManager = new SelectionManager();
