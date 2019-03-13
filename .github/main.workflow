workflow "New workflow" {
  on = "push"
  resolves = [
    "Lint",
    "Build",
  ]
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Lint" {
  uses = "actions/npm@master"
  needs = ["install"]
  args = "run lint"
}

action "Test" {
  uses = "actions/npm@master"
  needs = ["Lint"]
  args = "run test"
}

action "Build" {
  uses = "actions/npm@master"
  needs = ["Test"]
  args = "run build --prod  --base-href polylateral"
}
