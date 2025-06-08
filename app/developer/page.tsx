"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { GithubIcon, Code } from "lucide-react"

interface GithubUser {
  login: string
  name: string
  avatar_url: string
  html_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
  blog: string
  company: string
  location: string
  created_at: string
}

interface GithubRepo {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  updated_at: string
  watchers_count: number
  homepage: string
}

export default function DeveloperPage() {
  const [user, setUser] = useState<GithubUser | null>(null)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGithubData() {
      try {
        setLoading(true)
        toast.loading("Fetching GitHub data...", { id: "github-data" })

        // Fetch user data
        const userResponse = await fetch("https://api.github.com/users/anbuinfosec")
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data")
        }
        const userData = await userResponse.json()
        setUser(userData)

        // Fetch repositories
        const reposResponse = await fetch("https://api.github.com/users/anbuinfosec/repos?sort=updated&per_page=10")
        if (!reposResponse.ok) {
          throw new Error("Failed to fetch repositories")
        }
        const reposData = await reposResponse.json()
        setRepos(reposData)

        toast.dismiss("github-data")
        toast.success("GitHub data loaded successfully")
      } catch (err) {
        toast.dismiss("github-data")
        toast.error("Failed to load GitHub data", {
          description: err instanceof Error ? err.message : "An unknown error occurred",
        })
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchGithubData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg font-medium text-gray-900 dark:text-white">Loading developer information...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Fetching data from GitHub API</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <div className="text-center">
            <GithubIcon className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Error Loading Data</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Code className="h-6 w-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Developer Information</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 ml-8">
          GitHub profile and repositories from anbuinfosec
        </p>
      </div>

      {user && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-8">
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar_url || "/placeholder.svg"}
                  alt={user.name || user.login}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name || user.login}</h2>
                <p className="text-gray-500 dark:text-gray-400">@{user.login}</p>
              </div>

              {user.bio && <p className="text-center mt-4 text-gray-600 dark:text-gray-400">{user.bio}</p>}

              <div className="flex justify-center gap-4 mt-6">
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-white">{user.public_repos}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Repos</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-white">{user.followers}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 dark:text-white">{user.following}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Following</p>
                </div>
              </div>

              <hr className="my-6 border-gray-200 dark:border-gray-600" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <GithubIcon className="h-4 w-4 text-gray-500" />
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    GitHub Profile →
                  </a>
                </div>

                {user.blog && (
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-gray-500" />
                    <a
                      href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Website →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Repositories */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Repositories</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {repos.length > 0 ? (
                    repos.map((repo) => (
                      <div key={repo.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-lg text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {repo.name} →
                            </a>
                            {repo.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{repo.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                              ⭐ {repo.stargazers_count}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                              🍴 {repo.forks_count}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {repo.language && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                              {repo.language}
                            </span>
                          )}

                          {repo.topics &&
                            repo.topics.slice(0, 3).map((topic, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
                              >
                                {topic}
                              </span>
                            ))}

                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100">
                            Updated {formatDate(repo.updated_at)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No repositories found</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <a
                    href={`https://github.com/${user.login}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View All Repositories →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
