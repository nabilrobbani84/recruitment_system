import apiClient from '@/lib/apiClient';
import { Application } from '@/lib/types';

interface ApplicationFormData {
  coverLetter?: string;
  // Bisa ditambahkan field lain sesuai kebutuhan form lamaran
}

class ApplicationService {
  /**
   * Mengirim lamaran untuk sebuah pekerjaan.
   * @param jobId - ID pekerjaan yang dilamar.
   * @param formData - Data tambahan seperti cover letter.
   * @returns Promise<Application> - Data lamaran yang baru dibuat.
   */
  async applyToJob(jobId: string, formData: ApplicationFormData): Promise<Application> {
    try {
      const response = await apiClient.post(`/jobs/${jobId}/apply`, formData);
      return response.data;
    } catch (error) {
      console.error(`Error applying to job ${jobId}:`, error);
      // Cek jika error karena sudah pernah melamar
      if ((error as any).response?.data?.message === 'Already applied') {
        throw new Error('Anda sudah pernah melamar di pekerjaan ini.');
      }
      throw new Error('Gagal mengirim lamaran.');
    }
  }

  /**
   * Mengambil riwayat lamaran pengguna yang sedang login.
   * @returns Promise<Application[]> - Daftar riwayat lamaran.
   */
  async getApplications(): Promise<Application[]> {
    try {
      const response = await apiClient.get('/candidate/applications');
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw new Error('Gagal mengambil riwayat lamaran.');
    }
  }
}

export const applicationService = new ApplicationService();