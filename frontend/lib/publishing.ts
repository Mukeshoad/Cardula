import api from "./api"

export interface PublishJob {
  jobId: string
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
  result?: {
    publishedUrl: string
    deploymentId: string
    sitePath: string
  }
  error?: string
  qrCode?: string
}

export interface Domain {
  id: string
  domain: string
  status: "PENDING" | "VERIFIED" | "FAILED"
  sslStatus: "PENDING" | "PROVISIONED" | "FAILED"
  projectId?: string
  createdAt: string
  updatedAt: string
  verificationToken?: string
  dnsRecords?: Array<{
    type: string
    name: string
    value: string
    ttl: number
  }>
}

export const publishingApi = {
  async publishProject(projectId: string): Promise<{ jobId: string }> {
    const response = await api.post(`/projects/${projectId}/publish`)
    return response.data
  },

  async getPublishStatus(jobId: string): Promise<PublishJob> {
    const response = await api.get(`/projects/jobs/${jobId}/status`)
    return response.data
  },
}

export const domainsApi = {
  async addDomain(domain: string, projectId?: string): Promise<Domain> {
    const response = await api.post("/domains", { domain, projectId })
    return response.data.domain
  },

  async getDomains(): Promise<Domain[]> {
    const response = await api.get("/domains")
    return response.data.domains
  },

  async getDomainStatus(domainId: string): Promise<Domain> {
    const response = await api.get(`/domains/${domainId}/status`)
    return response.data.domain
  },

  async deleteDomain(domainId: string): Promise<void> {
    await api.delete(`/domains/${domainId}`)
  },
}
