workflow "New workflow" {
  on = "push"
  resolves = [
    "Lint",
    "DeployGhPages",
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

action "Build" {
  uses = "actions/npm@master"
  needs = ["Lint"]
  args = "run build:prod -- --base-href polylateral"
}

action "DeployGhPages" {
  uses = "maxheld83/ghpages@v0.2.1"
  needs = ["Build"]
  env = {
    BUILD_DIR = "dist/polylateral/"
  }
  secrets = ["GITHUB_TOKEN", "GH_PAT"]
}
