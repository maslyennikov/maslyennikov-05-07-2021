import { AnyAction } from "redux";

export type ActionCreator = (
  type: string,
  payload?: Record<string, string>
) => AnyAction;

export const createAction: ActionCreator = (
  type: string,
  payload?: Record<string, string>
): AnyAction => ({
  type,
  payload,
});
