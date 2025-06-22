const axios = require('axios');

// Sample articles data
const sampleArticles = [
  {
    title: "LAMDAKU Raih Pengakuan ISO 17020 untuk Standar Internasional",
    slug: "lamdaku-raih-pengakuan-iso-17020",
    content: `
      <div class="article-content">
        <div class="highlight-box">
          <h3>Pencapaian Bersejarah</h3>
          <p>LAMDAKU (Lembaga Akreditasi Mandiri Untuk Kesehatan) berhasil meraih pengakuan ISO 17020:2012 dari badan akreditasi internasional, menandai tonggak penting dalam perjalanan organisasi.</p>
        </div>

        <p>Pengakuan ini menjadikan LAMDAKU sebagai salah satu lembaga akreditasi kesehatan pertama di Indonesia yang memenuhi standar internasional untuk badan inspeksi.</p>

        <h3>Makna Pengakuan ISO 17020</h3>
        <p>Standar ISO 17020:2012 menetapkan persyaratan umum untuk kompetensi badan inspeksi yang melakukan inspeksi. Dengan meraih sertifikasi ini, LAMDAKU telah membuktikan bahwa:</p>

        <div class="step-list">
          <div class="step-item">
            <span class="step-number">1</span>
            <div class="step-content">
              <h4>Kompetensi Teknis Terjamin</h4>
              <p>Sistem manajemen mutu yang robust dan sesuai standar internasional</p>
            </div>
          </div>
          <div class="step-item">
            <span class="step-number">2</span>
            <div class="step-content">
              <h4>Independensi dan Objektivitas</h4>
              <p>Proses akreditasi yang bebas dari konflik kepentingan</p>
            </div>
          </div>
          <div class="step-item">
            <span class="step-number">3</span>
            <div class="step-content">
              <h4>Konsistensi Global</h4>
              <p>Standar yang diakui secara internasional</p>
            </div>
          </div>
        </div>

        <div class="cta-box">
          <h3>Dampak untuk Industri Kesehatan</h3>
          <p>Pengakuan ini memberikan jaminan lebih tinggi bagi fasilitas kesehatan yang menggunakan jasa akreditasi LAMDAKU untuk mencapai standar mutu internasional.</p>
        </div>
      </div>
    `,
    excerpt: "LAMDAKU berhasil meraih pengakuan ISO 17020:2012, menjadikannya sebagai lembaga akreditasi kesehatan dengan standar internasional di Indonesia.",
    author: "Tim LAMDAKU",
    status: "published",
    featured_image: null,
    meta_description: "LAMDAKU raih sertifikasi ISO 17020 untuk standar akreditasi internasional kesehatan",
    meta_keywords: "LAMDAKU, ISO 17020, akreditasi kesehatan, standar internasional"
  },
  {
    title: "Panduan Lengkap Persiapan Akreditasi Klinik Tahun 2025",
    slug: "panduan-persiapan-akreditasi-klinik-2025",
    content: `
      <div class="article-content">
        <p>Akreditasi klinik merupakan proses penting untuk memastikan kualitas pelayanan kesehatan. Berikut panduan lengkap persiapan akreditasi klinik untuk tahun 2025.</p>

        <div class="highlight-box">
          <h3>Mengapa Akreditasi Klinik Penting?</h3>
          <p>Akreditasi bukan hanya sekedar sertifikat, tetapi jaminan bahwa klinik Anda memberikan pelayanan berkualitas dan aman bagi pasien.</p>
        </div>

        <h3>Tahapan Persiapan Akreditasi</h3>

        <div class="step-list">
          <div class="step-item">
            <span class="step-number">1</span>
            <div class="step-content">
              <h4>Assessment Awal</h4>
              <p>Evaluasi kondisi klinik saat ini terhadap standar akreditasi</p>
              <ul>
                <li>Review dokumen dan prosedur yang ada</li>
                <li>Identifikasi gap terhadap standar</li>
                <li>Buat timeline perbaikan</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <span class="step-number">2</span>
            <div class="step-content">
              <h4>Penyusunan Dokumen</h4>
              <p>Persiapkan semua dokumen yang diperlukan</p>
              <ul>
                <li>Kebijakan dan prosedur operasional</li>
                <li>Panduan klinis</li>
                <li>Dokumentasi pelatihan staff</li>
                <li>Record pemeliharaan peralatan</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <span class="step-number">3</span>
            <div class="step-content">
              <h4>Pelatihan Tim</h4>
              <p>Pastikan seluruh tim memahami standar akreditasi</p>
              <ul>
                <li>Pelatihan untuk management</li>
                <li>Workshop untuk staf medis</li>
                <li>Training untuk staf administrasi</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <span class="step-number">4</span>
            <div class="step-content">
              <h4>Simulasi dan Mock Survey</h4>
              <p>Lakukan simulasi survey akreditasi</p>
              <ul>
                <li>Internal mock survey</li>
                <li>External pre-assessment</li>
                <li>Perbaikan berdasarkan temuan</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="cta-box">
          <h3>Butuh Bantuan Profesional?</h3>
          <p>LAMDAKU siap membantu klinik Anda dalam persiapan akreditasi dengan tim konsultan berpengalaman dan metodologi yang terbukti.</p>
          <p><strong>Hubungi kami untuk konsultasi gratis!</strong></p>
        </div>
      </div>
    `,
    excerpt: "Panduan komprehensif untuk mempersiapkan akreditasi klinik tahun 2025, mulai dari assessment awal hingga pelaksanaan survey.",
    author: "Dr. Ahmad Santoso",
    status: "published",
    featured_image: null,
    meta_description: "Panduan lengkap persiapan akreditasi klinik 2025 dari LAMDAKU",
    meta_keywords: "akreditasi klinik, persiapan akreditasi, LAMDAKU, standar kesehatan"
  },
  {
    title: "Inovasi Digital dalam Manajemen Mutu Laboratorium",
    slug: "inovasi-digital-manajemen-mutu-laboratorium",
    content: `
      <div class="article-content">
        <p>Era digital membawa transformasi besar dalam manajemen mutu laboratorium. Teknologi terkini memungkinkan monitoring real-time dan compliance yang lebih efektif.</p>

        <div class="highlight-box">
          <h3>Revolusi Digital Lab Management</h3>
          <p>Dari sistem manual ke otomatisasi cerdas - bagaimana teknologi mengubah landscape manajemen mutu laboratorium.</p>
        </div>

        <h3>Teknologi Terdepan untuk Lab Modern</h3>

        <div class="step-list">
          <div class="step-item">
            <span class="step-number">1</span>
            <div class="step-content">
              <h4>LIMS (Laboratory Information Management System)</h4>
              <p>Sistem terintegrasi untuk manajemen sampel dan data</p>
              <ul>
                <li>Tracking sampel real-time</li>
                <li>Quality control otomatis</li>
                <li>Reporting compliance</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <span class="step-number">2</span>
            <div class="step-content">
              <h4>AI-Powered Quality Monitoring</h4>
              <p>Kecerdasan buatan untuk deteksi anomali</p>
              <ul>
                <li>Pattern recognition untuk quality issues</li>
                <li>Predictive maintenance equipment</li>
                <li>Automated calibration scheduling</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <span class="step-number">3</span>
            <div class="step-content">
              <h4>Blockchain untuk Data Integrity</h4>
              <p>Jaminan integritas data yang tidak dapat diubah</p>
              <ul>
                <li>Immutable audit trail</li>
                <li>Secure data sharing</li>
                <li>Regulatory compliance</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>Manfaat Implementasi</h3>
        <p>Implementasi teknologi digital dalam manajemen mutu laboratorium memberikan beberapa keuntungan signifikan:</p>

        <ul>
          <li><strong>Efisiensi Operasional:</strong> Otomatisasi proses rutin mengurangi human error</li>
          <li><strong>Compliance:</strong> Monitoring real-time memastikan adherence terhadap standar</li>
          <li><strong>Data Analytics:</strong> Insight mendalam untuk continuous improvement</li>
          <li><strong>Cost Reduction:</strong> Optimisasi resource dan maintenance</li>
        </ul>

        <div class="cta-box">
          <h3>LAMDAKU Digital Solutions</h3>
          <p>LAMDAKU mengembangkan solusi digital terkini untuk membantu laboratorium mencapai excellence dalam manajemen mutu.</p>
        </div>
      </div>
    `,
    excerpt: "Eksplorasi inovasi digital terbaru dalam manajemen mutu laboratorium, dari LIMS hingga AI-powered monitoring.",
    author: "Prof. Budi Hartono",
    status: "published",
    featured_image: null,
    meta_description: "Inovasi digital untuk manajemen mutu laboratorium modern",
    meta_keywords: "LIMS, digital lab, manajemen mutu, LAMDAKU, laboratorium"
  }
];

async function addSampleArticles() {
  console.log('📝 Adding Sample Articles to Backend...\n');

  const baseUrl = 'http://localhost:8000/api/v1/pages';

  for (let i = 0; i < sampleArticles.length; i++) {
    const article = sampleArticles[i];
    
    try {
      console.log(`📄 Adding Article ${i + 1}: "${article.title}"`);
      
      const response = await axios.post(baseUrl, article, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`✅ Successfully added: ${article.title}`);
        console.log(`   ID: ${response.data?.id || 'Unknown'}`);
      }
      
    } catch (error) {
      console.log(`❌ Failed to add "${article.title}"`);
      console.log(`   Error: ${error.response?.status} - ${error.response?.statusText}`);
      
      if (error.response?.data) {
        console.log(`   Details: ${JSON.stringify(error.response.data)}`);
      }
    }
    
    console.log('');
  }
  
  // Verify articles were added
  console.log('🔍 Verifying articles were added...\n');
  
  try {
    const response = await axios.get(baseUrl);
    console.log(`✅ Total articles now: ${Array.isArray(response.data) ? response.data.length : 'Unknown'}`);
    
    if (Array.isArray(response.data) && response.data.length > 0) {
      console.log('\n📋 Articles in database:');
      response.data.forEach((article, index) => {
        console.log(`   ${index + 1}. ${article.title || 'No title'} (ID: ${article.id})`);
      });
    }
  } catch (error) {
    console.log('❌ Failed to verify articles');
  }
}

addSampleArticles().catch(console.error);
