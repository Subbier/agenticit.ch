export type WorkflowDemoScenario = "ready" | "missing-owner"
export type WorkflowDemoStage =
  | "received"
  | "prepared"
  | "review"
  | "approved"
  | "blocked"

export type WorkflowDemoState = Readonly<{
  scenario: WorkflowDemoScenario
  stage: WorkflowDemoStage
}>

type WorkflowDemoAction =
  | { type: "select"; scenario: WorkflowDemoScenario }
  | { type: "advance" }
  | { type: "approve" }
  | { type: "reset" }

export const initialWorkflowDemo: WorkflowDemoState = {
  scenario: "ready",
  stage: "received",
}

// A local example only: no persistence, clock, network or external action.
export function workflowDemoReducer(
  state: WorkflowDemoState,
  action: WorkflowDemoAction,
): WorkflowDemoState {
  switch (action.type) {
    case "select":
      return { scenario: action.scenario, stage: "received" }
    case "reset":
      return { scenario: state.scenario, stage: "received" }
    case "advance":
      if (state.stage === "received") return { ...state, stage: "prepared" }
      if (state.stage === "prepared")
        return {
          ...state,
          stage: state.scenario === "missing-owner" ? "blocked" : "review",
        }
      return state
    case "approve":
      return state.stage === "review" ? { ...state, stage: "approved" } : state
  }
}
