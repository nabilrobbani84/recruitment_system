import apiClient from '@/lib/apiClient';
import { Job, JobFilterParams } from '@/lib/types';

class JobService {
  /**
   * Mengambil daftar pekerjaan dengan filter dan paginasi.
   * @param params - Objek filter (query, location, dll).
   * @returns Promise<Job[]> - Daftar pekerjaan.
   */
  async getJobs(params: JobFilterParams): Promise<{ data: Job[], totalPages: number }> {
    try {
      const response = await apiClient.get('/jobs', { params });
      // Asumsi backend mengembalikan data dan info paginasi di header atau body
      return {
        data: response.data.jobs,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Gagal mengambil data pekerjaan.');
    }
  }

  /**
   * Mengambil detail satu pekerjaan berdasarkan ID.
   * @param id - ID pekerjaan.
   * @returns Promise<Job> - Detail pekerjaan.
   */
  async getJobById(id: string): Promise<Job> {
    try {
      const response = await apiClient.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job with id ${id}:`, error);
      throw new Error('Gagal mengambil detail pekerjaan.');
    }
  }
  
  /**
   * Mengambil daftar pekerjaan yang disimpan oleh pengguna.
   * @returns Promise<Job[]> - Daftar pekerjaan yang disimpan.
   */
  async getSavedJobs(): Promise<Job[]> {
    try {
      // Endpoint ini diasumsikan ada di backend dan terproteksi
      const response = await apiClient.get('/candidate/saved-jobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      throw new Error('Gagal mengambil pekerjaan yang disimpan.');
    }
  }

  /**
   * Menyimpan pekerjaan ke daftar pengguna.
   * @param jobId - ID pekerjaan yang akan disimpan.
   * @returns Promise<void>
   */
  async saveJob(jobId: string): Promise<void> {
    try {
      await apiClient.post('/candidate/saved-jobs', { jobId });
    } catch (error) {
      console.error(`Error saving job ${jobId}:`, error);
      throw new Error('Gagal menyimpan pekerjaan.');
    }
  }

  /**
   * Menghapus pekerjaan dari daftar simpanan pengguna.
   * @param jobId - ID pekerjaan yang akan dihapus.
   * @returns Promise<void>
   */
  async unsaveJob(jobId: string): Promise<void> {
    try {
      await apiClient.delete(`/candidate/saved-jobs/${jobId}`);
    } catch (error) {
      console.error(`Error unsaving job ${jobId}:`, error);
      throw new Error('Gagal menghapus pekerjaan dari daftar simpanan.');
    }
  }
}

// Ekspor sebagai instance agar menjadi singleton (hanya dibuat sekali)
export const jobService = new JobService();