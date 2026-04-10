# data-lakes-vs-data-warehouses-what-your-organization-needs-k

Source: https://www.databricks.com/blog/data-lakes-vs-data-warehouses-what-your-organization-needs-know

   Data Lakes vs Data Warehouses Explained | Databricks Blog 

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
    
    [Data Strategy](/blog/category/data-strategy)
3.  /
    
    Article
    

* * *

# Data Lakes vs Data Warehouses: What Your Organization Needs to Know

Published: October 9, 2025

[Data Strategy](/blog/category/data-strategy)9 min read

by [Databricks Staff](/blog/author/databricks-staff)

Share this post

*   [](https://www.linkedin.com/shareArticle?mini=true&url=https://www.databricks.com/blog/data-lakes-vs-data-warehouses-what-your-organization-needs-know&summary=&source=)
*   [](https://twitter.com/intent/tweet?text=https://www.databricks.com/blog/data-lakes-vs-data-warehouses-what-your-organization-needs-know)
*   [](https://www.facebook.com/sharer/sharer.php?u=https://www.databricks.com/blog/data-lakes-vs-data-warehouses-what-your-organization-needs-know)

Keep up with us

Subscribe

#### Summary

*   Data lakes vs. warehouses: Data lakes store raw, unstructured data for flexibility and machine learning, while warehouses handle structured data for fast BI and reporting.
*   Modern data demands: AI, real-time analytics and open architectures are driving the need for scalable, governed and interoperable platforms.
*   The lakehouse advantage: Unified platforms merge the scale of lakes with the performance of warehouses, reducing complexity and \\supporting diverse use cases.

In today’s AI-driven, data-saturated landscape, choosing the right data architecture is more than a technical decision—it’s a strategic one. As organizations work to scale analytics, activate AI and reduce operational complexity, foundational questions arise: How should data be stored? What systems best support our goals? And do we need to choose between flexibility and performance?

For many, the answer comes down to data lakes and data warehouses—or increasingly, a combination of both. This blog builds on [our glossary page](https://www.databricks.com/discover/data-warehouse#vs) to explore how these architectures differ in practice, how modern trends are changing the equation and what to consider when building a modern data platform.

## Data Lake vs Data Warehouse: Understanding the Fundamentals

Both data lakes and data warehouses are designed to handle big data at scale, but they do so in fundamentally different ways. Choosing between them shapes everything from data governance and performance to analytics capabilities and long-term scalability, making this decision a critical cornerstone of any data strategy.

A data warehouse is a data management system that stores data from multiple sources in a highly structured way. Data is cleansed, transformed and integrated into a schema that is optimized for querying and analysis. Data warehouses represent a traditional enterprise data approach and are typically used for business intelligence (BI), analytics, data visualization, reporting and preparing data for machine learning (ML).

A data lake is a flexible repository that stores raw data in its native format. Data lakes are often used to consolidate all of an organization's data in a single, central location, where it can be saved "as is," without the need to impose a schema (a formal structure for how the data is organized) like a data warehouse does. By leveraging inexpensive object storage and open formats, data lakes enable many applications to take advantage of the data. AWS S3 (Amazon Simple Storage Service) and Azure Data Lake Storage (ADLS Gen2) are examples of object storage solutions for building enterprise data lakes.

## Key Differences: A Quick Recap

At their core, [data lakes](https://www.databricks.com/discover/data-lakes) and [data warehouses](https://www.databricks.com/discover/data-warehouse) serve different needs:

Data warehouses are structured to provide a single source of truth for business intelligence and analytics. The way they store data makes it possible to quickly and easily analyze business data uploaded from operational systems such as point-of-sale systems, inventory management systems or marketing or sales databases for easier insights and reporting. However, data warehouses are expensive and locked in to proprietary systems.

Data lakes support a wide range of analytics, from data exploration to advanced ML, providing flexibility for data scientists and engineers. Unlike most databases and data warehouses, data lakes can process all data types, including unstructured and semi-structured data such as images, video, audio and documents, which are critical for strategic ML and advanced analytics use cases. Data lakes are open format, so users avoid lock-in to a proprietary system.

Beyond these two, other components such as operational data stores (ODS) and data marts add further specialization.

Feature

Data Lake

Data Warehouse

Schema

Schema-on-read

Schema-on-write

Data Types

Unstructured, semi-structured

Structured

Use Cases

ML, data science, streaming

BI, dashboards, reporting

Storage Cost

Lower

Higher

Performance

Variable

High for SQL workloads

Increasingly, hybrid architectures are emerging to meet evolving enterprise demands. The lakehouse emerged as a way to combine the best of both worlds: the scalability and flexibility of data lakes with the structure, performance and governance of data warehouses. Merging them together into a single system means that data teams can move faster because they don't need to access multiple systems. It also ensures that teams have the most complete and up-to-date data available. The lakehouse approach supports modern analytics, machine learning and BI workloads on a single platform, reducing data duplication and simplifying data architectures as data volumes, use cases and complexity continue to grow.

## Use Cases

Different teams and workloads demand different things from a data platform.

*   **Data engineers** need to be able to ingest raw data at scale, support ingestion pipelines and enable data processing in real-time.
*   **BI and analytics teams** need consistent and reliable performance to power dashboards and key business metrics.
*   **Data scientists** require access to a wide range of data types, including raw logs and semi-structured formats, to support experimentation and model development.

These needs are not mutually exclusive. A single organization may need to support all the above, and do so with agility, governance and cost control in mind.

## Data Storage Architecture: Technical Considerations

Data storage architecture defines how data is organized, stored and accessed, with implications for scalability, performance, cost and flexibility. Understanding these technical considerations helps organizations choose the right platform for different data types and use cases.

### How data lakes store raw data

Data lakes store raw data in its native format, including unstructured and semi-structured data from multiple sources. Unlike traditional data warehouses, which require data to follow a predefined structure, a data lake uses a flat architecture built on low-cost object storage to manage data at scale. This design makes data lakes both cost-effective and highly durable for storing vast volumes of data. In a data lake, data is ingested without a predefined schema, enabling a schema-on-read model where structure is applied only when the data is accessed for analysis. This allows for high-speed ingestion and flexibility across different use cases. Users are able to apply their own schemas without duplicating or reshaping the underlying data.

### Data warehouse storage models

Data warehouses store processed and structured data from various sources in a well-organized way that enables users to quickly and easily access data. Data is cleansed, transformed and integrated into a schema that is optimized for querying and analysis. This approach is known as schema-on-write, meaning the data model is defined in advance and data must conform to that structure before it is stored. Common data models used in data warehouses include star and snowflake schemas, which organize data into fact tables and related dimension tables to support efficient analytical queries.

Data enters a data warehouse via ETL (extract, transform, load), a process of extracting data from source systems, transforming the data and then loading it into the data warehouse. ETL is typically used for integrating structured data from multiple sources into a predefined schema. These source systems often include transactional databases (OLTP systems) such as CRM, ERP and order management systems, from which operational data is periodically extracted and consolidated to provide a unified, historical view for reporting and analytics.

### Data management across both systems

Managing data across data lakes and data warehouses comes with challenges because their different approaches often conflict. Data lakes prioritize flexibility and raw data ingestion, which can lead to weak governance, limited visibility into data lineage and difficulty enforcing security and compliance policies. The ingestion of unverified and inconsistently formatted data in data lakes increases the risk of duplicate, unreliable or conflicting data as it moves into more structured environments. Differences in schema enforcement, data processing pipelines and transaction support can also cause the lake and warehouse to fall out of sync, resulting in inconsistent metrics and a lack of a single, trusted source of truth.

Modern data platforms are increasingly designed to address these challenges by unifying data management across environments. Effective solutions provide unified governance and security as well as data integration and quality control capabilities. They connect to a wide range of data sources and support diverse data types, apply consistent standards across systems and offer architectural flexibility while maintaining scalability and performance.

The lakehouse architecture offers a unique solution with data structures and management features similar to those in a data warehouse, directly on top of low-cost cloud storage in open formats. This combines the best elements of data lakes and data warehouses, allowing traditional analytics, data science and machine learning to coexist in the same system.

REPORT

### Unlocking Enterprise AI: Opportunities and Strategies

[Get the report](/resources/whitepaper/mit-technology-review-insights-report?itm_source=www&itm_category=home&itm_page=home&itm_offer=mit-technology-review-insights-report)

## Evaluating your data storage needs

Forward-thinking data leaders aren’t asking, “Which data storage architecture is better?” They’re asking, “What foundation will help us achieve our business goals?” When evaluating data storage needs, consider how different teams will collect data and use data. Whether you're analyzing customer behavior with big data analytics or maintaining a centralized repository for enterprise data, the right data management solution should provide insights for key business decisions without compromising core data consistency.

When evaluating your [data architecture](https://www.databricks.com/glossary/data-architecture), consider:

*   **Flexibility** vs. **performance**: Do you need agility to explore data, or speed to power high-concurrency dashboards?
*   **Governance and compliance**: How important is lineage, security and enforcement of policies across all data types?
*   **Integration and tooling**: Will your platform connect with your preferred BI, ML and data engineering tools—open source or commercial?
*   **Scalability and total cost of ownership (TCO)**: Can you scale efficiently and avoid unnecessary overheads or duplication?
*   **Openness and interoperability**: How well does your platform support open table formats, open data sharing, open ANSI SQL and open governance to maximize flexibility and avoid vendor lock-in?

These aren't binary trade-offs. Increasingly, the best answer is all of the above.

## A Conversation Shaped by Change

Modern organizations are no longer simply deciding between data lakes and data warehouses; they’re rethinking how data is stored, accessed and governed from the ground up. So, what's changed?

AI and [large language models (LLMs)](https://www.databricks.com/glossary/large-language-models-llm) rely on diverse, often unstructured data formats, placing new demands on data infrastructure that go beyond the capabilities of traditional storage systems. At the same time, real-time analytics has become a baseline expectation, requiring low-latency, highly scalable access to data. As data ecosystems grow more complex, establishing trust depends on robust cataloging, metadata management and [semantic layers](https://www.databricks.com/glossary/semantic-layer) that help teams understand and govern their data. Underpinning it all is a shift toward open architectures. Open formats and APIs are no longer optional — they're a strategic imperative for flexibility, interoperability and long-term agility.

Together, these forces are driving enterprises to adopt **unified data platforms** that combine the scalability of a data lake with the performance of a data warehouse without making a trade-off.

## The Case for a Unified Platform

[Lakehouse platforms](https://www.databricks.com/discover/free-training/lakehouse-platform) combine the scale and flexibility of a data lake with the reliability and performance of a data warehouse. Rather than managing and integrating separate systems, teams can work on a single, governed copy of the data—whether for SQL queries, [ML models](https://www.databricks.com/solutions/machine-learning) or streaming pipelines.

With the [**Databricks Data Intelligence Platform**](https://www.databricks.com/product/data-intelligence-platform), organizations can:

*   Use one platform for **analytics and AI workloads**
*   Access **structured and unstructured** data in the same environment
*   Scale **compute and storage independently**
*   Govern data end-to-end with **Unity Catalog**
*   Avoid vendor lock-in with **open formats and APIs**
*   Power **real-time analytics** and streaming workloads with low-latency performance

The result is a simplified architecture that accelerates time to insight, increases productivity and supports a wide range of business and technical use cases—without compromise.

## FAQs: Data lakes vs. data warehouses

### What is the difference between a data warehouse and a data lake?

The difference between a data lake and a data warehouse is how data is stored and used. Data warehouses store structured, processed data using schema-on-write and are optimized for BI and reporting. Data lakes store raw data in its native format using schema-on-read, supporting data exploration, machine learning and advanced analytics. Each serves different needs.

### What is an example of a data lake?

A data lake is commonly built on cloud object storage such as AWS S3 or Azure Data Lake Storage. It stores raw data from many sources and is often used by data engineers and data scientists for analytics and machine learning. Modern data solutions add governance and performance on top of open storage.

### Can a data lakehouse replace a data warehouse?

Yes. A data lakehouse is a data management evolution that combines data lake scalability with data warehouse performance and governance. Its unified architecture supports BI, analytics and ML on a single platform without compromising data consistency, reducing the need for separate systems.

### Do you need a data warehouse if you have a data lake?

Traditionally, yes. Data lakes handled raw data, while data warehouses stored structured data to support analysts and business users. Modern lakehouse platforms combine the best of both worlds with a unified platform that supports all cases in one governed system.

## Conclusion

While data lakes and data warehouses each have their strengths, the future lies in convergence. A lakehouse approach enables organizations to support diverse data users and use cases on a single platform—without choosing between flexibility and performance.

As your data strategy evolves, consider how a unified architecture can help your organization move faster, reduce complexity and stay prepared for what’s next.

Ready to learn more? See how the Databricks Data Intelligence Platform can simplify your architecture and set your data strategy up for long-term success.

[Explore the Databricks Lakehouse](https://www.databricks.com/product/data-lakehouse)

Keep up with us

Subscribe

Recommended for you

Share this post

*   [](https://www.linkedin.com/shareArticle?mini=true&url=https://www.databricks.com/blog/data-lakes-vs-data-warehouses-what-your-organization-needs-know&summary=&source=)
*   [](https://twitter.com/intent/tweet?text=https://www.databricks.com/blog/data-lakes-vs-data-warehouses-what-your-organization-needs-know)
*   [](https://www.facebook.com/sharer/sharer.php?u=https://www.databricks.com/blog/data-lakes-vs-data-warehouses-what-your-organization-needs-know)

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
*   ![](https://www.databricks.com