export interface RepoSummary {
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  updated_at: string
  url: string
  topics: string[]
}
