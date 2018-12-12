Using [git-seekret](https://github.com/18f/laptop#git-seekret) contributors should add the following rules in a new rule file in
`~.git_support/seekret-rules`

contents:

```
fdescribe:
  match: .*f(describe|it).*$
only:
  match: .*(describe|it)\.only.*$
passwords:
  match: \s*(secret|password)("|')\s*(=|:)\s*('|").+('|").*$
  unmatch: \s*permit_secret":\s*"secret"$
printenv:
  match: .*printenv.*$
  ```
