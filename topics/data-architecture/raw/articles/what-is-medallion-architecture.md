# What Is Medallion Architecture

Source: https://www.databricks.com/blog/what-is-medallion-architecture

   What is Medallion Architecture? | Databricks 

[Skip to main content](#main)

[

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMyIiBoZWlnaHQ9IjIyIiB2aWV3Qm94PSIwIDAgMTMyIDIyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0xOC4zMTggOS4yNzUtOC42MzEgNC44NTlMLjQ0NSA4Ljk0MiAwIDkuMTgydjMuNzdsOS42ODcgNS40MzEgOC42My00Ljg0djEuOTk1bC04LjYzIDQuODYtOS4yNDItNS4xOTItLjQ0NS4yNHYuNjQ2bDkuNjg3IDUuNDMyIDkuNjY4LTUuNDMydi0zLjc2OWwtLjQ0NS0uMjQtOS4yMjMgNS4xNzMtOC42NS00Ljg0VjEwLjQybDguNjUgNC44NCA5LjY2OC01LjQzVjYuMTE0bC0uNDgyLS4yNzctOS4xODYgNS4xNTVMMS40ODIgNi40MWw4LjIwNS00LjYgNi43NDEgMy43ODcuNTkzLS4zMzJ2LS40NjJMOS42ODcuNjg0IDAgNi4xMTV2LjU5Mmw5LjY4NyA1LjQzMiA4LjYzLTQuODZ6IiBmaWxsPSIjRUUzRDJDIi8+PHBhdGggZD0iTTM3LjQ0OSAxOC40NDNWMS44NTJoLTIuNTU2djYuMjA3YzAgLjA5My0uMDU2LjE2Ny0uMTQ4LjIwNGEuMjMuMjMgMCAwIDEtLjI0LS4wNTZjLS44NzEtMS4wMTYtMi4yMjMtMS41ODktMy43MDUtMS41ODktMy4xNjcgMC01LjY1IDIuNjYtNS42NSA2LjA2IDAgMS42NjMuNTc1IDMuMTk3IDEuNjMgNC4zMjRhNS40NCA1LjQ0IDAgMCAwIDQuMDIgMS43MzZjMS40NjMgMCAyLjgxNS0uNjEgMy43MDQtMS42NjIuMDU2LS4wNzQuMTY3LS4wOTMuMjQtLjA3NC4wOTMuMDM3LjE1LjExLjE1LjIwM3YxLjIzOHptLTYuMDkzLTIuMDE0Yy0yLjAzOCAwLTMuNjMtMS42NDQtMy42My0zLjc1IDAtMi4xMDcgMS41OTItMy43NTEgMy42My0zLjc1MXMzLjYzIDEuNjQ0IDMuNjMgMy43NS0xLjU5MyAzLjc1LTMuNjMgMy43NW0xOS43NjIgMi4wMTZWNi44OTZoLTIuNTM3VjguMDZjMCAuMDkzLS4wNTYuMTY2LS4xNDkuMjAzYS4yLjIgMCAwIDEtLjI0LS4wNzNjLS44NTItMS4wMTctMi4xODYtMS41OS0zLjcwNS0xLjU5LTMuMTY3IDAtNS42NDkgMi42NjEtNS42NDkgNi4wNiAwIDMuNCAyLjQ4MiA2LjA2IDUuNjUgNi4wNiAxLjQ2MyAwIDIuODE1LS42MSAzLjcwNC0xLjY4LjA1NS0uMDc1LjE2Ni0uMDkzLjI0LS4wNzUuMDkzLjAzNy4xNDkuMTExLjE0OS4yMDR2MS4yNTZoMi41Mzd6bS02LjA1Ni0yLjAxNGMtMi4wMzggMC0zLjYzLTEuNjQ1LTMuNjMtMy43NSAwLTIuMTA3IDEuNTkyLTMuNzUxIDMuNjMtMy43NTFzMy42MyAxLjY0NCAzLjYzIDMuNzUtMS41OTMgMy43NS0zLjYzIDMuNzVtMjcuNzgxIDIuMDE1VjYuODk2aC0yLjUzOFY4LjA2YzAgLjA5My0uMDU1LjE2Ni0uMTQ4LjIwM3MtLjE4NSAwLS4yNC0uMDczYy0uODUzLTEuMDE3LTIuMTg2LTEuNTktMy43MDUtMS41OS0zLjE4NiAwLTUuNjQ5IDIuNjYxLTUuNjQ5IDYuMDggMCAzLjQxNyAyLjQ4MiA2LjA2IDUuNjQ5IDYuMDYgMS40NjMgMCAyLjgxNS0uNjEgMy43MDQtMS42ODIuMDU2LS4wNzQuMTY3LS4wOTMuMjQxLS4wNzQuMDkzLjAzNy4xNDguMTEuMTQ4LjIwM3YxLjI1NnptLTYuMDU3LTIuMDE0Yy0yLjAzNyAwLTMuNjMtMS42NDUtMy42My0zLjc1IDAtMi4xMDcgMS41OTMtMy43NTEgMy42My0zLjc1MXMzLjYzIDEuNjQ0IDMuNjMgMy43NS0xLjU5MyAzLjc1LTMuNjMgMy43NW0xMC43MDYuNjQ3Yy4wMTkgMCAuMDU2LS4wMTkuMDc0LS4wMTkuMDU2IDAgLjEzLjAzNy4xNjcuMDc0Ljg3IDEuMDE2IDIuMjIyIDEuNTg5IDMuNzA0IDEuNTg5IDMuMTY3IDAgNS42NS0yLjY2IDUuNjUtNi4wNiAwLTEuNjYzLS41NzUtMy4xOTYtMS42My00LjMyM2E1LjQ0IDUuNDQgMCAwIDAtNC4wMi0xLjczN2MtMS40NjMgMC0yLjgxNS42MS0zLjcwNCAxLjY2My0uMDU2LjA3NC0uMTQ4LjA5Mi0uMjQuMDc0LS4wOTMtLjAzNy0uMTQ5LS4xMTEtLjE0OS0uMjA0VjEuODUyaC0yLjU1NnYxNi41OWgyLjU1NlYxNy4yOGMwLS4wOTMuMDU2LS4xNjYuMTQ4LS4yMDNtLS4yNi00LjM5OGMwLTIuMTA2IDEuNTk0LTMuNzUgMy42MzEtMy43NXMzLjYzIDEuNjQ0IDMuNjMgMy43NS0xLjU5MyAzLjc1LTMuNjMgMy43NS0zLjYzLTEuNjYyLTMuNjMtMy43NW0xNy4yNDQtMy40MTZjLjI0IDAgLjQ2My4wMTkuNjEuMDU2VjYuNjk1YTIuNCAyLjQgMCAwIDAtLjQyNS0uMDM3Yy0xLjMzNCAwLTIuNTU2LjY4NC0zLjIwNCAxLjc3NC0uMDU2LjA5Mi0uMTQ5LjEzLS4yNDEuMDkyYS4yMi4yMiAwIDAgMS0uMTY3LS4yMDNWNi44OThoLTIuNTM3djExLjU2NmgyLjU1NnYtNS4xYzAtMi41MyAxLjI5Ni00LjEgMy40MDgtNC4xbTQuODE1LTIuMzY3aC0yLjU5M3YxMS41NjZoMi41OTN6TTk3Ljk1OCAxLjg3YTEuNTcxIDEuNTcxIDAgMSAwIDAgMy4xNDEgMS41NzEgMS41NzEgMCAxIDAgMC0zLjE0bTguOTI4IDQuNzI5Yy0zLjU1NiAwLTYuMTMxIDIuNTUtNi4xMzEgNi4wOCAwIDEuNzE3LjYxMiAzLjI1IDEuNzA0IDQuMzYgMS4xMTIgMS4xMDggMi42NjcgMS43MTggNC40MDggMS43MTggMS40NDUgMCAyLjU1Ni0uMjc3IDQuNjY4LTEuODNsLTEuNDYzLTEuNTMzYy0xLjAzOC42ODQtMi4wMDEgMS4wMTYtMi45NDUgMS4wMTYtMi4xNDkgMC0zLjc2LTEuNjA3LTMuNzYtMy43MzJzMS42MTEtMy43MzIgMy43Ni0zLjczMmMxLjAxOCAwIDEuOTYzLjMzMyAyLjkwOCAxLjAxNmwxLjYyOS0xLjUzM2MtMS45MDctMS42MjYtMy42My0xLjgzLTQuNzc4LTEuODNtOS4xNDkgNi43NjJhLjIuMiAwIDAgMSAuMTQ5LS4wNTVoLjAxOGMuMDU2IDAgLjExMS4wMzcuMTY3LjA3M2w0LjA5MyA1LjA2M2gzLjE0OWwtNS4yOTctNi4zOTNjLS4wNzUtLjA5Mi0uMDc1LS4yMjIuMDE4LS4yOTVsNC44NzEtNC44NmgtMy4xM2wtNC4yMDQgNC4yMTNjLS4wNTYuMDU1LS4xNDguMDc0LS4yNDEuMDU1YS4yMy4yMyAwIDAgMS0uMTMtLjIwM1YxLjg3aC0yLjU3NHYxNi41OTFoMi41NTZ2LTQuNTA4YzAtLjA1NS4wMTgtLjEzLjA3NC0uMTY2eiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xMjcuNzc2IDE4LjczOWMyLjA5MyAwIDQuMjIzLTEuMjc1IDQuMjIzLTMuNjk1IDAtMS41ODktMS0yLjY4LTMuMDM3LTMuMzQ0bC0xLjM5LS40NjJjLS45NDQtLjMxNC0xLjM4OS0uNzU4LTEuMzg5LTEuMzY3IDAtLjcwMi42My0xLjE4MyAxLjUxOS0xLjE4My44NTIgMCAxLjYxMS41NTUgMi4wOTMgMS41MTVsMi4wNTYtMS4xMDhjLS43NTktMS41NTItMi4zMzQtMi41MTMtNC4xNDktMi41MTMtMi4yOTcgMC0zLjk2MyAxLjQ3OC0zLjk2MyAzLjQ5MiAwIDEuNjA3Ljk2MyAyLjY3OSAyLjk0NCAzLjMwN2wxLjQyNy40NjJjMSAuMzE0IDEuNDI2LjcyIDEuNDI2IDEuMzY3IDAgLjk4LS45MDggMS4zMy0xLjY4NiAxLjMzLTEuMDM3IDAtMS45NjMtLjY2NS0yLjQwNy0xLjc1NWwtMi4wOTMgMS4xMDljLjY4NSAxLjc1NSAyLjM3IDIuODQ1IDQuNDI2IDIuODQ1bS02OS41NDYtLjExMWMuODE1IDAgMS41MzgtLjA3NCAxLjk0NS0uMTN2LTIuMjE2YTE0IDE0IDAgMCAxLTEuMjc4LjA3M2MtMS4wMzcgMC0xLjgzMy0uMTg0LTEuODMzLTIuNDJWOS4xODdjMC0uMTMuMDkyLS4yMjIuMjIyLS4yMjJoMi41VjYuODc3aC0yLjVhLjIxNC4yMTQgMCAwIDEtLjIyMi0uMjIxVjMuMzNoLTIuNTU2djMuMzQ0YzAgLjEzLS4wOTMuMjIyLS4yMjMuMjIyaC0xLjc3OHYyLjA4OGgxLjc3OGMuMTMgMCAuMjIzLjA5Mi4yMjMuMjIxdjUuMzc3YzAgNC4wNDYgMi43MDQgNC4wNDYgMy43MjIgNC4wNDYiIGZpbGw9IiMwMDAiLz48L3N2Zz4=)



](/)

[Login](https://login.databricks.com/?dbx_source=www&itm=main-cta-login&l=en-EN)

[

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMyIiBoZWlnaHQ9IjIyIiB2aWV3Qm94PSIwIDAgMTMyIDIyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0xOC4zMTggOS4yNzUtOC42MzEgNC44NTlMLjQ0NSA4Ljk0MiAwIDkuMTgydjMuNzdsOS42ODcgNS40MzEgOC42My00Ljg0djEuOTk1bC04LjYzIDQuODYtOS4yNDItNS4xOTItLjQ0NS4yNHYuNjQ2bDkuNjg3IDUuNDMyIDkuNjY4LTUuNDMydi0zLjc2OWwtLjQ0NS0uMjQtOS4yMjMgNS4xNzMtOC42NS00Ljg0VjEwLjQybDguNjUgNC44NCA5LjY2OC01LjQzVjYuMTE0bC0uNDgyLS4yNzctOS4xODYgNS4xNTVMMS40ODIgNi40MWw4LjIwNS00LjYgNi43NDEgMy43ODcuNTkzLS4zMzJ2LS40NjJMOS42ODcuNjg0IDAgNi4xMTV2LjU5Mmw5LjY4NyA1LjQzMiA4LjYzLTQuODZ6IiBmaWxsPSIjRUUzRDJDIi8+PHBhdGggZD0iTTM3LjQ0OSAxOC40NDNWMS44NTJoLTIuNTU2djYuMjA3YzAgLjA5My0uMDU2LjE2Ny0uMTQ4LjIwNGEuMjMuMjMgMCAwIDEtLjI0LS4wNTZjLS44NzEtMS4wMTYtMi4yMjMtMS41ODktMy43MDUtMS41ODktMy4xNjcgMC01LjY1IDIuNjYtNS42NSA2LjA2IDAgMS42NjMuNTc1IDMuMTk3IDEuNjMgNC4zMjRhNS40NCA1LjQ0IDAgMCAwIDQuMDIgMS43MzZjMS40NjMgMCAyLjgxNS0uNjEgMy43MDQtMS42NjIuMDU2LS4wNzQuMTY3LS4wOTMuMjQtLjA3NC4wOTMuMDM3LjE1LjExLjE1LjIwM3YxLjIzOHptLTYuMDkzLTIuMDE0Yy0yLjAzOCAwLTMuNjMtMS42NDQtMy42My0zLjc1IDAtMi4xMDcgMS41OTItMy43NTEgMy42My0zLjc1MXMzLjYzIDEuNjQ0IDMuNjMgMy43NS0xLjU5MyAzLjc1LTMuNjMgMy43NW0xOS43NjIgMi4wMTZWNi44OTZoLTIuNTM3VjguMDZjMCAuMDkzLS4wNTYuMTY2LS4xNDkuMjAzYS4yLjIgMCAwIDEtLjI0LS4wNzNjLS44NTItMS4wMTctMi4xODYtMS41OS0zLjcwNS0xLjU5LTMuMTY3IDAtNS42NDkgMi42NjEtNS42NDkgNi4wNiAwIDMuNCAyLjQ4MiA2LjA2IDUuNjUgNi4wNiAxLjQ2MyAwIDIuODE1LS42MSAzLjcwNC0xLjY4LjA1NS0uMDc1LjE2Ni0uMDkzLjI0LS4wNzUuMDkzLjAzNy4xNDkuMTExLjE0OS4yMDR2MS4yNTZoMi41Mzd6bS02LjA1Ni0yLjAxNGMtMi4wMzggMC0zLjYzLTEuNjQ1LTMuNjMtMy43NSAwLTIuMTA3IDEuNTkyLTMuNzUxIDMuNjMtMy43NTFzMy42MyAxLjY0NCAzLjYzIDMuNzUtMS41OTMgMy43NS0zLjYzIDMuNzVtMjcuNzgxIDIuMDE1VjYuODk2aC0yLjUzOFY4LjA2YzAgLjA5My0uMDU1LjE2Ni0uMTQ4LjIwM3MtLjE4NSAwLS4yNC0uMDczYy0uODUzLTEuMDE3LTIuMTg2LTEuNTktMy43MDUtMS41OS0zLjE4NiAwLTUuNjQ5IDIuNjYxLTUuNjQ5IDYuMDggMCAzLjQxNyAyLjQ4MiA2LjA2IDUuNjQ5IDYuMDYgMS40NjMgMCAyLjgxNS0uNjEgMy43MDQtMS42ODIuMDU2LS4wNzQuMTY3LS4wOTMuMjQxLS4wNzQuMDkzLjAzNy4xNDguMTEuMTQ4LjIwM3YxLjI1NnptLTYuMDU3LTIuMDE0Yy0yLjAzNyAwLTMuNjMtMS42NDUtMy42My0zLjc1IDAtMi4xMDcgMS41OTMtMy43NTEgMy42My0zLjc1MXMzLjYzIDEuNjQ0IDMuNjMgMy43NS0xLjU5MyAzLjc1LTMuNjMgMy43NW0xMC43MDYuNjQ3Yy4wMTkgMCAuMDU2LS4wMTkuMDc0LS4wMTkuMDU2IDAgLjEzLjAzNy4xNjcuMDc0Ljg3IDEuMDE2IDIuMjIyIDEuNTg5IDMuNzA0IDEuNTg5IDMuMTY3IDAgNS42NS0yLjY2IDUuNjUtNi4wNiAwLTEuNjYzLS41NzUtMy4xOTYtMS42My00LjMyM2E1LjQ0IDUuNDQgMCAwIDAtNC4wMi0xLjczN2MtMS40NjMgMC0yLjgxNS42MS0zLjcwNCAxLjY2My0uMDU2LjA3NC0uMTQ4LjA5Mi0uMjQuMDc0LS4wOTMtLjAzNy0uMTQ5LS4xMTEtLjE0OS0uMjA0VjEuODUyaC0yLjU1NnYxNi41OWgyLjU1NlYxNy4yOGMwLS4wOTMuMDU2LS4xNjYuMTQ4LS4yMDNtLS4yNi00LjM5OGMwLTIuMTA2IDEuNTk0LTMuNzUgMy42MzEtMy43NXMzLjYzIDEuNjQ0IDMuNjMgMy43NS0xLjU5MyAzLjc1LTMuNjMgMy43NS0zLjYzLTEuNjYyLTMuNjMtMy43NW0xNy4yNDQtMy40MTZjLjI0IDAgLjQ2My4wMTkuNjEuMDU2VjYuNjk1YTIuNCAyLjQgMCAwIDAtLjQyNS0uMDM3Yy0xLjMzNCAwLTIuNTU2LjY4NC0zLjIwNCAxLjc3NC0uMDU2LjA5Mi0uMTQ5LjEzLS4yNDEuMDkyYS4yMi4yMiAwIDAgMS0uMTY3LS4yMDNWNi44OThoLTIuNTM3djExLjU2NmgyLjU1NnYtNS4xYzAtMi41MyAxLjI5Ni00LjEgMy40MDgtNC4xbTQuODE1LTIuMzY3aC0yLjU5M3YxMS41NjZoMi41OTN6TTk3Ljk1OCAxLjg3YTEuNTcxIDEuNTcxIDAgMSAwIDAgMy4xNDEgMS41NzEgMS41NzEgMCAxIDAgMC0zLjE0bTguOTI4IDQuNzI5Yy0zLjU1NiAwLTYuMTMxIDIuNTUtNi4xMzEgNi4wOCAwIDEuNzE3LjYxMiAzLjI1IDEuNzA0IDQuMzYgMS4xMTIgMS4xMDggMi42NjcgMS43MTggNC40MDggMS43MTggMS40NDUgMCAyLjU1Ni0uMjc3IDQuNjY4LTEuODNsLTEuNDYzLTEuNTMzYy0xLjAzOC42ODQtMi4wMDEgMS4wMTYtMi45NDUgMS4wMTYtMi4xNDkgMC0zLjc2LTEuNjA3LTMuNzYtMy43MzJzMS42MTEtMy43MzIgMy43Ni0zLjczMmMxLjAxOCAwIDEuOTYzLjMzMyAyLjkwOCAxLjAxNmwxLjYyOS0xLjUzM2MtMS45MDctMS42MjYtMy42My0xLjgzLTQuNzc4LTEuODNtOS4xNDkgNi43NjJhLjIuMiAwIDAgMSAuMTQ5LS4wNTVoLjAxOGMuMDU2IDAgLjExMS4wMzcuMTY3LjA3M2w0LjA5MyA1LjA2M2gzLjE0OWwtNS4yOTctNi4zOTNjLS4wNzUtLjA5Mi0uMDc1LS4yMjIuMDE4LS4yOTVsNC44NzEtNC44NmgtMy4xM2wtNC4yMDQgNC4yMTNjLS4wNTYuMDU1LS4xNDguMDc0LS4yNDEuMDU1YS4yMy4yMyAwIDAgMS0uMTMtLjIwM1YxLjg3aC0yLjU3NHYxNi41OTFoMi41NTZ2LTQuNTA4YzAtLjA1NS4wMTgtLjEzLjA3NC0uMTY2eiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xMjcuNzc2IDE4LjczOWMyLjA5MyAwIDQuMjIzLTEuMjc1IDQuMjIzLTMuNjk1IDAtMS41ODktMS0yLjY4LTMuMDM3LTMuMzQ0bC0xLjM5LS40NjJjLS45NDQtLjMxNC0xLjM4OS0uNzU4LTEuMzg5LTEuMzY3IDAtLjcwMi42My0xLjE4MyAxLjUxOS0xLjE4My44NTIgMCAxLjYxMS41NTUgMi4wOTMgMS41MTVsMi4wNTYtMS4xMDhjLS43NTktMS41NTItMi4zMzQtMi41MTMtNC4xNDktMi41MTMtMi4yOTcgMC0zLjk2MyAxLjQ3OC0zLjk2MyAzLjQ5MiAwIDEuNjA3Ljk2MyAyLjY3OSAyLjk0NCAzLjMwN2wxLjQyNy40NjJjMSAuMzE0IDEuNDI2LjcyIDEuNDI2IDEuMzY3IDAgLjk4LS45MDggMS4zMy0xLjY4NiAxLjMzLTEuMDM3IDAtMS45NjMtLjY2NS0yLjQwNy0xLjc1NWwtMi4wOTMgMS4xMDljLjY4NSAxLjc1NSAyLjM3IDIuODQ1IDQuNDI2IDIuODQ1bS02OS41NDYtLjExMWMuODE1IDAgMS41MzgtLjA3NCAxLjk0NS0uMTN2LTIuMjE2YTE0IDE0IDAgMCAxLTEuMjc4LjA3M2MtMS4wMzcgMC0xLjgzMy0uMTg0LTEuODMzLTIuNDJWOS4xODdjMC0uMTMuMDkyLS4yMjIuMjIyLS4yMjJoMi41VjYuODc3aC0yLjVhLjIxNC4yMTQgMCAwIDEtLjIyMi0uMjIxVjMuMzNoLTIuNTU2djMuMzQ0YzAgLjEzLS4wOTMuMjIyLS4yMjMuMjIyaC0xLjc3OHYyLjA4OGgxLjc3OGMuMTMgMCAuMjIzLjA5Mi4yMjMuMjIxdjUuMzc3YzAgNC4wNDYgMi43MDQgNC4wNDYgMy43MjIgNC4wNDYiIGZpbGw9IiMwMDAiLz48L3N2Zz4=)



](/)

*   Why Databricks
    
    *   *   Discover
            
            *   [For Executives](/why-databricks/executives)
                
            *   [For Startups](/product/startups)
                
            *   [Lakehouse Architecture](/product/data-lakehouse)
                
            *   [Databricks AI Research](/research/databricks-ai-research)
                
            
        *   Customers
            
            *   [Customer Stories](/customers)
                
            
        *   Partners
            
            *   [Partner Overview
                
                Explore the Databricks partner ecosystem
                
                ](/partners)
                
            *   [Partner Spotlight
                
                Featured partner announcements
                
                ](/partners/partner-spotlight)
                
            *   [Partner Program
                
                Explore benefits, tiers and how to become a partner
                
                ](/partners/partner-program)
                
            *   [Cloud Providers
                
                Databricks on AWS, Azure and GCP
                
                ](/partners/cloud-partners)
                
            *   [Find a Partner
                
                Discover Databricks partners for your needs
                
                ](/partners/partner-directory)
                
            *   [Partner Solutions
                
                Find custom industry and migration solutions
                
                ](/partners/consulting-and-si/partner-solutions)
                
            
    
*   Product
    
    *   *   Databricks Platform
            
            *   [Platform Overview
                
                A unified platform for data, analytics and AI
                
                ](/product/data-intelligence-platform)
                
            *   [Data Management
                
                Data reliability, security and performance
                
                ](/product/delta-lake-on-databricks)
                
            *   [Sharing
                
                An open, secure, zero-copy sharing for all data
                
                ](/product/delta-sharing)
                
            *   [Data Warehousing
                
                Serverless data warehouse for SQL analytics
                
                ](/product/databricks-sql)
                
            *   [Governance
                
                Unified governance for all data, analytics and AI assets
                
                ](/product/unity-catalog)
                
            *   [Data Engineering
                
                ETL and orchestration for batch and streaming data
                
                ](/product/data-engineering)
                
            *   [Artificial Intelligence
                
                Build and deploy ML and GenAI applications
                
                ](/product/artificial-intelligence)
                
            *   [Data Science
                
                Collaborative data science at scale
                
                ](/product/data-science)
                
            *   [Business Intelligence
                
                Intelligent analytics for real-world data
                
                ](https://www.databricks.com/product/business-intelligence)
                
            *   [Application Development
                
                Quickly build secure data and AI apps
                
                ](/product/databricks-apps)
                
            *   [Database
                
                Postgres for data apps and AI agents
                
                ](/product/lakebase)
                
            *   [Security
                
                Open agentic SIEM built for the AI era
                
                ](/product/lakewatch)
                
            
        *   Integrations and Data
            
            *   [Marketplace
                
                Open marketplace for data, analytics and AI
                
                ](/product/marketplace)
                
            *   [IDE Integrations
                
                Build on the Lakehouse in your favorite IDE
                
                ](/product/data-science/ide-integrations)
                
            *   [Partner Connect
                
                Discover and integrate with the Databricks ecosystem
                
                ](/partnerconnect)
                
            
        *   Pricing
            
            *   [Databricks Pricing
                
                Explore product pricing, DBUs and more
                
                ](/product/pricing)
                
            *   [Cost Calculator
                
                Estimate your compute costs on any cloud
                
                ](/product/pricing/product-pricing/instance-types)
                
            
        *   Open Source
            
            *   [Open Source Technologies
                
                Learn more about the innovations behind the platform
                
                ](/product/open-source)
                
            
    
*   Solutions
    
    *   *   Databricks for Industries
            
            *   [Communications](/solutions/industries/communications)
                
            *   [Media and Entertainment](/solutions/industries/media-and-entertainment)
                
            *   [Financial Services](/solutions/industries/financial-services)
                
            *   [Public Sector](/solutions/industries/public-sector)
                
            *   [Healthcare & Life Sciences](/solutions/industries/healthcare-and-life-sciences)
                
            *   [Retail](/solutions/industries/retail-industry-solutions)
                
            *   [Manufacturing](/solutions/industries/manufacturing-industry-solutions)
                
            *   [See All Industries](/solutions)
                
            
        *   Cross Industry Solutions
            
            *   [AI Agents](/solutions/ai-agents)
                
            *   [Cybersecurity](/solutions/industries/cybersecurity)
                
            *   [Marketing](/solutions/industries/marketing)
                
            
        *   Migration & Deployment
            
            *   [Data Migration](/solutions/migration)
                
            *   [Professional Services](/professional-services)
                
            
        *   Solution Accelerators
            
            *   [Explore Accelerators
                
                Move faster toward outcomes that matter
                
                ](/solutions/accelerators)
                
            
    
*   Resources
    
    *   *   Learning
            
            *   [Training
                
                Discover curriculum tailored to your needs
                
                ](https://www.databricks.com/learn/training/home)
                
            *   [Databricks Academy
                
                Sign in to the Databricks learning platform
                
                ](https://www.databricks.com/learn/training/login)
                
            *   [Certification
                
                Gain recognition and differentiation
                
                ](https://www.databricks.com/learn/training/certification)
                
            *   [Free Edition
                
                Learn professional Data and AI tools for free
                
                ](/learn/free-edition)
                
            *   [University Alliance
                
                Want to teach Databricks? See how.
                
                ](/university)
                
            
        *   Events
            
            *   [Data + AI Summit](https://www.databricks.com/dataaisummit)
                
            *   [Data + AI World Tour](/dataaisummit/worldtour)
                
            *   [AI Days](https://www.databricks.com/ai-days)
                
            *   [Event Calendar](/events)
                
            
        *   Blog and Podcasts
            
            *   [Databricks Blog
                
                Explore news, product announcements, and more
                
                ](/blog)
                
            *   [Databricks AI R&D Blog
                
                Explore our AI research and engineering work
                
                ](/blog/category/ai)
                
            *   [Data Brew Podcast
                
                Let’s talk data!
                
                ](/discover/data-brew)
                
            *   [Champions of Data + AI Podcast
                
                Insights from data leaders powering innovation
                
                ](/discover/champions-of-data-and-ai)
                
            
        *   Get Help
            
            *   [Customer Support](https://www.databricks.com/support)
                
            *   [Documentation](https://www.databricks.com/databricks-documentation)
                
            *   [Community](https://community.databricks.com/s/)
                
            
        *   Dive Deep
            
            *   [Resource Center](/resources)
                
            *   [Demo Center](/resources/demos)
                
            *   [Architecture Center](/resources/architectures)
                
            
    
*   About
    
    *   *   Company
            
            *   [Who We Are](/company/about-us)
                
            *   [Our Team](/company/leadership-team)
                
            *   [Databricks Ventures](/databricks-ventures)
                
            *   [Contact Us](/company/contact)
                
            
        *   Careers
            
            *   [Working at Databricks](/company/careers)
                
            *   [Open Jobs](/company/careers/open-positions)
                
            
        *   Press
            
            *   [Awards and Recognition](/company/awards-and-recognition)
                
            *   [Newsroom](/company/newsroom)
                
            
        *   Security and Trust
            
            *   [Security and Trust](/trust)
                
            
    
*   DATA + AI SUMMIT
    
    [
    
    ![Data+ai summit promo](https://www.databricks.com/sites/default/files/2026-03/dais26-nav-promo-240x96-2x.svg)
    
    JUNE 15–18|SAN FRANCISCO
    
    Don’t miss our biggest Summit yet. Save 50% with early-bird pricing. 
    
    Register
    
    ](/dataaisummit?itm_source=www&itm_category=home&itm_page=home&itm_location=navigation&itm_component=navigation&itm_offer=dataaisummit)
    

*   Ready to get started?
    
*   [Get a Demo](/resources/demos)

DATA + AI SUMMIT

[

![Data+ai summit promo](https://www.databricks.com/sites/default/files/2026-03/dais26-nav-promo-240x96-2x.svg)

JUNE 15–18|SAN FRANCISCO

Don’t miss our biggest Summit yet. Save 50% with early-bird pricing. 

Register

](/dataaisummit?itm_source=www&itm_category=home&itm_page=home&itm_location=navigation&itm_component=navigation&itm_offer=dataaisummit)

*   [Login](https://login.databricks.com/?dbx_source=www&itm=main-cta-login&l=en-EN)
*   [Try Databricks](https://www.databricks.com/signup?dbx_source=www&itm_data=dbx-web-nav&l=en-EN&itm_source=www&itm_category=home&itm_page=home&itm_offer=signup)

1.  [Blog](/blog)
2.  /
    
    [Data + AI Foundations](/blog/category/data-ai-foundations)
3.  /
    
    Topic
    

* * *

# What is Medallion Architecture?

## Lakehouse design pattern organizing data into bronze (raw), silver (cleaned), and gold (aggregated) layers for progressive data quality refinement

[Data + AI Foundations](/blog/category/data-ai-foundations)4 min read

by [Databricks Staff](/blog/author/databricks-staff)

Share this post

*   [](https://www.linkedin.com/shareArticle?mini=true&url=https://www.databricks.com/blog/what-is-medallion-architecture&summary=&source=)
*   [](https://twitter.com/intent/tweet?text=https://www.databricks.com/blog/what-is-medallion-architecture)
*   [](https://www.facebook.com/sharer/sharer.php?u=https://www.databricks.com/blog/what-is-medallion-architecture)

Keep up with us

Subscribe

#### Summary

*   Bronze layer ingests raw data from source systems as-is preserving full fidelity and history, supporting schema evolution and serving as immutable audit trail for regulatory compliance and data lineage tracking
*   Silver layer applies data quality checks, deduplication, standardization, and enrichment creating cleaned datasets validated against business rules, with incremental processing using change data capture for efficiency
*   Gold layer produces business-level aggregates, star schema models, and feature tables optimized for specific analytics use cases, dashboards, ML training, and serving end-user queries with guaranteed SLAs

##  What is a medallion architecture?

A **medallion architecture** is a data design pattern used to logically organize data in a [lakehouse](https://www.databricks.com/glossary/data-lakehouse), with the goal of incrementally and progressively improving the structure and quality of data as it flows through each layer of the architecture (from Bronze ⇒ Silver ⇒ Gold layer tables). Medallion architectures are sometimes also referred to as "multi-hop" architectures.

## Building data pipelines with medallion architecture

Databricks provides tools like Spark Declarative Pipelines that allow users to instantly build data pipelines with Bronze, Silver and Gold tables from just a few lines of code. And, with streaming tables and materialized views, users can create [streaming](https://www.databricks.com/product/data-streaming) Lakeflow pipelines built on Apache Spark™️ Structured Streaming that are incrementally refreshed and updated. For more details, see [Databricks documentation](https://docs.databricks.com/en/delta-live-tables/transform.html#combine-streaming-tables-and-materialized-views-in-a-single-pipeline) on combining streaming tables and materialized views in a single pipeline.

## Bronze layer (raw data)

The **Bronze layer** is where we land all the data from external source systems. The table structures in this layer correspond to the source system table structures "as-is," along with any additional metadata columns that capture the load date/time, process ID, etc. The focus in this layer is quick Change Data Capture and the ability to provide an historical archive of source (cold storage), data lineage, auditability, reprocessing if needed without rereading the data from the source system.

## Silver layer (cleansed and conformed data)

In the **Silver layer** of the lakehouse, the data from the Bronze layer is matched, merged, conformed and cleansed ("just-enough") so that the Silver layer can provide an "Enterprise view" of all its key business entities, concepts and transactions. (e.g. master customers, stores, non-duplicated transactions and cross-reference tables).

The Silver layer brings the data from different sources into an Enterprise view and enables self-service analytics for ad-hoc reporting, advanced analytics and ML. It serves as a source for Departmental Analysts, Data Engineers and Data Scientists to further create projects and analysis to answer business problems via enterprise and departmental data projects in the Gold Layer.

In the lakehouse data engineering paradigm, typically the ELT methodology is followed vs. ETL - which means only minimal or "just-enough" transformations and data cleansing rules are applied while loading the Silver layer. Speed and agility to ingest and deliver the data in the data lake is prioritized, and a lot of project-specific complex transformations and business rules are applied while loading the data from the Silver to Gold layer. From a data modeling perspective, the Silver Layer has more 3rd-Normal Form like data models. Data Vault-like, write-performant data models can be used in this layer.

REPORT

### The agentic AI playbook for the enterprise

[Read now](/resources/ebook/state-of-ai-agents?itm_source=www&itm_category=home&itm_page=home&itm_offer=state-of-ai-agents)

## Gold layer (curated business-level tables)

Data in the **Gold layer** of the lakehouse is typically organized in consumption-ready "project-specific" databases. The Gold layer is for reporting and uses more de-normalized and read-optimized data models with fewer joins. The final layer of data transformations and data quality rules are applied here. Final presentation layer of projects such as Customer Analytics, Product Quality Analytics, Inventory Analytics, Customer Segmentation, Product Recommendations, Marking/Sales Analytics etc. fit in this layer. We see a lot of Kimball style star schema-based data models or Inmon style Data marts fit in this Gold Layer of the lakehouse.

So you can see that the data is curated as it moves through the different layers of a lakehouse. In some cases, we also see that lot of Data Marts and EDWs from the traditional RDBMS technology stack are ingested into the lakehouse, so that for the first time Enterprises can do "pan-EDW" advanced analytics and ML - which was just not possible or too cost prohibitive to do on a traditional stack. (e.g. IoT/Manufacturing data is tied with Sales and Marketing data for defect analysis or health care genomics, EMR/HL7 clinical data markets are tied with financial claims data to create a Healthcare Data Lake for timely and improved patient care analytics.)

## Benefits of a lakehouse architecture

*   Simple data model
*   Easy to understand and implement
*   Enables incremental ETL
*   Can recreate your tables from raw data at any time
*   ACID transactions, time travel

## A quick primer on lakehouses

A [**lakehouse**](https://www.databricks.com/product/data-lakehouse) is a data platform architecture paradigm that combines the best features of data lakes and data warehouses. A modern lakehouse is a highly scalable and performant data platform hosting both raw and prepared data sets for quick business consumption and to drive advanced business insights and decisions. It breaks data silos and allows seamless, secure data access to authorized users across the enterprise on one platform.

## Medallion architecture and data mesh

The Medallion architecture is compatible with the concept of a **data mesh.** Bronze and silver tables can be joined together in a "one-to-many" fashion, meaning that the data in a single upstream table could be used to generate multiple downstream tables.

**\[** [**Try Databricks for free today**](https://www.databricks.com/try-databricks?itm_data=medallion-glossary) **\]**

## Additional Resources

*   [What is a Data Lakehouse?](https://www.databricks.com/glossary/data-lakehouse)
*   [Data Lakehouse Platform by Databricks](https://www.databricks.com/product/data-lakehouse)
*   [How Incremental ETL Makes Life Simpler With Data Lakes - Databricks Blog](https://www.databricks.com/blog/2021/08/30/how-incremental-etl-makes-life-simpler-with-data-lakes.html)
*   [Simplify Your Medallion Architecture with Delta Lake's CDF Feature](https://www.databricks.com/notebooks/delta-lake-cdf.html)

Keep up with us

Subscribe

Recommended for you

Share this post

*   [](https://www.linkedin.com/shareArticle?mini=true&url=https://www.databricks.com/blog/what-is-medallion-architecture&summary=&source=)
*   [](https://twitter.com/intent/tweet?text=https://www.databricks.com/blog/what-is-medallion-architecture)
*   [](https://www.facebook.com/sharer/sharer.php?u=https://www.databricks.com/blog/what-is-medallion-architecture)

## Never miss a Databricks post

Subscribe to our blog and get the latest posts delivered to your inbox

## Sign up

[

](https://www.databricks.com/)

Why Databricks

Discover

*   [For Executives](/why-databricks/executives)
*   [For Startups](/product/startups)
*   [Lakehouse Architecture](/product/data-lakehouse)
*   [Databricks AI Research](/research/databricks-ai-research)

Customers

*   [Customer Stories](https://www.databricks.com/customers)

Partners

*   [Partner Overview](/partners)
*   [Partner Program](/partners/partner-program)
*   [Find a Partner](/partners/partner-directory)
*   [Partner Spotlight](/partners/partner-spotlight)
*   [Cloud Providers](/partners/cloud-partners)
*   [Partner Solutions](/partners/consulting-and-si/partner-solutions)

Why Databricks

Discover

*   [For Executives](/why-databricks/executives)
*   [For Startups](/product/startups)
*   [Lakehouse Architecture](/product/data-lakehouse)
*   [Databricks AI Research](/research/databricks-ai-research)

Customers

*   [Customer Stories](https://www.databricks.com/customers)

Partners

*   [Partner Overview](/partners)
*   [Partner Program](/partners/partner-program)
*   [Find a Partner](/partners/partner-directory)
*   [Partner Spotlight](/partners/partner-spotlight)
*   [Cloud Providers](/partners/cloud-partners)
*   [Partner Solutions](/partners/consulting-and-si/partner-solutions)

Product

Databricks Platform

*   [Platform Overview](/product/data-intelligence-platform)
*   [Sharing](/product/delta-sharing)
*   [Governance](/product/unity-catalog)
*   [Artificial Intelligence](/product/artificial-intelligence)
*   [Business Intelligence](/product/business-intelligence)
*   [Database](/product/lakebase)
*   [Data Management](/product/delta-lake-on-databricks)
*   [Data Warehousing](/product/databricks-sql)
*   [Data Engineering](/product/data-engineering)
*   [Data Science](/product/data-science)
*   [Application Development](/product/databricks-apps)
*   [Security](/product/lakewatch)

Pricing

*   [Pricing Overview](/product/pricing)
*   [Pricing Calculator](/product/pricing/product-pricing/instance-types)

[Open Source](/product/open-source)

Integrations and Data

*   [Marketplace](/product/marketplace)
*   [IDE Integrations](/product/data-science/ide-integrations)
*   [Partner Connect](/partnerconnect)

Product

Databricks Platform

*   [Platform Overview](/product/data-intelligence-platform)
*   [Sharing](/product/delta-sharing)
*   [Governance](/product/unity-catalog)
*   [Artificial Intelligence](/product/artificial-intelligence)
*   [Business Intelligence](/product/business-intelligence)
*   [Database](/product/lakebase)
*   [Data Management](/product/delta-lake-on-databricks)
*   [Data Warehousing](/product/databricks-sql)
*   [Data Engineering](/product/data-engineering)
*   [Data Science](/product/data-science)
*   [Application Development](/product/databricks-apps)
*   [Security](/product/lakewatch)

Pricing

*   [Pricing Overview](/product/pricing)
*   [Pricing Calculator](/product/pricing/product-pricing/instance-types)

Open Source

Integrations and Data

*   [Marketplace](/product/marketplace)
*   [IDE Integrations](/product/data-science/ide-integrations)
*   [Partner Connect](/partnerconnect)

Solutions

Databricks For Industries

*   [Communications](/solutions/industries/communications)
*   [Financial Services](/solutions/industries/financial-services)
*   [Healthcare and Life Sciences](/solutions/industries/healthcare-and-life-sciences)
*   [Manufacturing](/solutions/industries/manufacturing-industry-solutions)
*   [Media and Entertainment](/solutions/industries/media-and-entertainment)
*   [Public Sector](/solutions/industries/federal-government)
*   [Retail](/solutions/industries/retail-industry-solutions)
*   [View All](/solutions)

Cross Industry Solutions

*   [Cybersecurity](/solutions/industries/cybersecurity)
*   [Marketing](/solutions/industries/marketing)

[Data Migration](/solutions/migration)

[Professional Services](/professional-services)

[Solution Accelerators](/solutions/accelerators)

Solutions

Databricks For Industries

*   [Communications](/solutions/industries/communications)
*   [Financial Services](/solutions/industries/financial-services)
*   [Healthcare and Life Sciences](/solutions/industries/healthcare-and-life-sciences)
*   [Manufacturing](/solutions/industries/manufacturing-industry-solutions)
*   [Media and Entertainment](/solutions/industries/media-and-entertainment)
*   [Public Sector](/solutions/industries/federal-government)
*   [Retail](/solutions/industries/retail-industry-solutions)
*   [View All](/solutions)

Cross Industry Solutions

*   [Cybersecurity](/solutions/industries/cybersecurity)
*   [Marketing](/solutions/industries/marketing)

Data Migration

Professional Services

Solution Accelerators

Resources

[Documentation](https://www.databricks.com/databricks-documentation)

[Customer Support](https://www.databricks.com/support)

[Community](https://community.databricks.com/)

Learning

*   [Training](/learn/training/home)
*   [Certification](https://www.databricks.com/learn/training/certification)
*   [Free Edition](/learn/free-edition)
*   [University Alliance](/university)
*   [Databricks Academy Login](https://www.databricks.com/learn/training/login)

Events

*   [Data + AI Summit](/dataaisummit)
*   [Data + AI World Tour](/dataaisummit/worldtour)
*   [AI Days](https://www.databricks.com/ai-days)
*   [Event Calendar](/events)

Blog and Podcasts

*   [Databricks Blog](/blog)
*   [Databricks AI R&D Blog](/blog/category/ai)
*   [Data Brew Podcast](/discover/data-brew)
*   [Champions of Data & AI Podcast](/discover/champions-of-data-and-ai)

Resources

Documentation

Customer Support

Community

Learning

*   [Training](/learn/training/home)
*   [Certification](https://www.databricks.com/learn/training/certification)
*   [Free Edition](/learn/free-edition)
*   [University Alliance](/university)
*   [Databricks Academy Login](https://www.databricks.com/learn/training/login)

Events

*   [Data + AI Summit](/dataaisummit)
*   [Data + AI World Tour](/dataaisummit/worldtour)
*   [AI Days](https://www.databricks.com/ai-days)
*   [Event Calendar](/events)

Blog and Podcasts

*   [Databricks Blog](/blog)
*   [Databricks AI R&D Blog](/blog/category/ai)
*   [Data Brew Podcast](/discover/data-brew)
*   [Champions of Data & AI Podcast](/discover/champions-of-data-and-ai)

About

Company

*   [Who We Are](/company/about-us)
*   [Our Team](/company/leadership-team)
*   [Databricks Ventures](/databricks-ventures)
*   [Contact Us](/company/contact)

Careers

*   [Open Jobs](/company/careers/open-positions)
*   [Working at Databricks](/company/careers)

Press

*   [Awards and Recognition](/company/awards-and-recognition)
*   [Newsroom](/company/newsroom)

[Security and Trust](/trust)

About

Company

*   [Who We Are](/company/about-us)
*   [Our Team](/company/leadership-team)
*   [Databricks Ventures](/databricks-ventures)
*   [Contact Us](/company/contact)

Careers

*   [Open Jobs](/company/careers/open-positions)
*   [Working at Databricks](/company/careers)

Press

*   [Awards and Recognition](/company/awards-and-recognition)
*   [Newsroom](/company/newsroom)

Security and Trust

[

](https://www.databricks.com/)

Databricks Inc.  
160 Spear Street, 15th Floor  
San Francisco, CA 94105  
1-866-330-0121

*   [](https://www.linkedin.com/company/databricks)
*   [](https://www.facebook.com/pages/Databricks/560203607379694)
*   [](https://twitter.com/databricks)
*   [](https://www.databricks.com/feed)
*   [](https://www.glassdoor.com/Overview/Working-at-Databricks-EI_IE954734.11,21.htm)
*   [](https://www.youtube.com/@Databricks)

[See Careers](https://www.databricks.com/company/careers)  
[at Databricks](https://www.databricks.com/company/careers)

*   [](https://www.linkedin.com/company/databricks)
*   [](https://www.facebook.com/pages/Databricks/560203607379694)
*   [](https://twitter.com/databricks)
*   [](https://www.databricks.com/feed)
*   [](https://www.glassdoor.com/Overview/Working-at-Databricks-EI_IE954734.11,21.htm)
*   [](https://www.youtube.com/@Databricks)

© Databricks 2026. All rights reserved. Apache, Apache Spark, Spark, the Spark Logo, Apache Iceberg, Iceberg, and the Apache Iceberg logo are trademarks of the [Apache Software Foundation](https://www.apache.org/).

*   [Privacy Notice](https://www.databricks.com/legal/privacynotice)
*   |[Terms of Use](https://www.databricks.com/legal/terms-of-use)
*   |[Modern Slavery Statement](https://www.databricks.com/legal/modern-slavery-policy-statement)
*   |[California Privacy](https://www.databricks.com/legal/supplemental-privacy-notice-california-residents)
*   |[Your Privacy Choices](#yourprivacychoices)
*   ![](https://www.databricks.com/sites/default/files/202