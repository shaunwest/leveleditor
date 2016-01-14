/**
 * Created by shaunwest on 10/06/15.
 */

export const SELECTED_TOOL = 'SELECTED_TOOL';

export function selectedTool(id) {
  return {
    type: SELECTED_TOOL,
    id
  };
}
