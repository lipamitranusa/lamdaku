<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VisionMissionController extends Controller
{
    public function index()
    {
        try {
            // Try to get from company_info table first
            $companyInfo = DB::table('company_info')->where('is_active', true)->first();
            
            if ($companyInfo && ($companyInfo->vision || $companyInfo->mission || $companyInfo->objectives)) {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'vision' => $companyInfo->vision,
                        'mission' => $companyInfo->mission ? json_decode($companyInfo->mission, true) : null,
                        'objectives' => $companyInfo->objectives ? json_decode($companyInfo->objectives, true) : null,
                    ]
                ]);
            }
            
            // Fallback to default data
            return response()->json([
                'success' => true,
                'data' => $this->getDefaultVisionMissionData()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    private function getDefaultVisionMissionData()
    {
        return [
            'vision' => "Menjadi lembaga akreditasi kesehatan terdepan dan terpercaya di Asia Tenggara yang berkomitmen meningkatkan kualitas pelayanan kesehatan melalui standar akreditasi internasional yang komprehensif dan berkelanjutan.",
            'mission' => [
                "Memberikan layanan akreditasi berkualitas tinggi sesuai standar internasional",
                "Meningkatkan kompetensi dan profesionalisme tenaga kesehatan",
                "Mengembangkan sistem manajemen mutu yang berkelanjutan", 
                "Memberikan konsultasi dan pendampingan terbaik kepada klien",
                "Melakukan inovasi berkelanjutan dalam metodologi akreditasi",
                "Membangun kemitraan strategis dengan stakeholder kesehatan"
            ],
            'objectives' => [
                [
                    'title' => 'Meningkatkan Kualitas Pelayanan',
                    'description' => 'Memastikan setiap fasilitas kesehatan yang kami akreditasi memberikan pelayanan terbaik kepada masyarakat'
                ],
                [
                    'title' => 'Membangun Kepercayaan Publik',
                    'description' => 'Menciptakan sistem akreditasi yang transparan dan dapat dipertanggungjawabkan kepada masyarakat'
                ],
                [
                    'title' => 'Mendorong Inovasi', 
                    'description' => 'Mengembangkan standar dan metodologi akreditasi yang adaptif terhadap perkembangan teknologi kesehatan'
                ],
                [
                    'title' => 'Memperluas Jangkauan',
                    'description' => 'Membuat layanan akreditasi dapat diakses oleh seluruh fasilitas kesehatan di Indonesia'
                ]
            ]
        ];
    }
}
