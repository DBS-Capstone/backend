import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Menghapus data lama (opsional, tapi bagus untuk konsistensi)
    await prisma.fotoVoice.deleteMany({});
    await prisma.bird.deleteMany({});

    const belukWatuBesi = await prisma.bird.create({
        data: {
            species_code: 'fepowl',
            ebird_url: 'https://ebird.org/species/fepowl',
            common_name: 'Beluk-watu Besi',
            scientific_name: 'Glaucidium brasilianum',
            family: 'Strigidae',
            order_name: 'Strigiformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Menyukai hutan tropis terbuka, habitat tepi, hutan sekunder dengan pepohonan, dan sabana pinus tropis. Juga dapat ditemukan di kota-kota dengan taman berhutan.',
            description:
            'Burung hantu kecil dan padat yang warnanya dapat bervariasi dari coklat karat hingga keabu-abuan. Semua variasi warna memiliki garis-garis keputihan halus di mahkota dan banyak garis gelap sempit di ekornya yang agak panjang.',
            behavior:
            'Sering aktif dan bersuara di siang hari (krepuskular). Kehadirannya sering terungkap oleh siulan terus-menerus dan perilaku pengeroyokan oleh burung-burung kecil. Berburu dari tempat bertengger, lalu melesat untuk menangkap mangsa.',
            diet: 'Memiliki makanan yang beragam dan berani, termasuk serangga besar, burung (kadang-kadang lebih besar dari dirinya sendiri), kadal, reptil lain, amfibi, dan mamalia kecil.',
            nesting:
            'Bersarang di lubang pohon atau kaktus, biasanya bekas lubang pelatuk. Jumlah telur 1-7 butir putih. Masa inkubasi sekitar 28 hari, dan anakan terbang 27-30 hari setelah menetas.',
            migration_pattern:
            'Umumnya adalah penghuni yang tidak bermigrasi, tetapi beberapa populasi mungkin menunjukkan pergerakan lokal.',
            vocalization:
            'Nyanyiannya adalah serangkaian panjang nada "tuut" siulan bernada tinggi yang monoton. Jantan mengeluarkan panggilan teritorial, sementara betina mungkin mengeluarkan suara cekikikan.',
            size_length_cm: 16.0,
            size_wingspan_cm: 35.0,
            size_weight_g: 65.0,
            finding_tips:
            'Dapat ditemukan pada siang hari. Dengarkan serangkaian siulan "tuut" yang terus-menerus. Juga, perhatikan kelompok burung kecil yang gelisah mengeroyok burung hantu ini, yang akan mengungkapkan lokasinya.',
            cool_facts: [
                'Memiliki dua "bintik mata palsu" di belakang kepalanya untuk menghalangi pemangsa menyerang dari belakang.',
                'Meskipun ukurannya kecil, ia adalah pemangsa tak kenal takut yang mampu menangani mangsa yang lebih besar dari dirinya.',
                'Tidak seperti kebanyakan burung hantu, ia memiliki telinga simetris, menunjukkan penglihatan lebih penting daripada pendengaran untuk berburu.',
            ],
        },
    });

    const sikatanParuhPerahu = await prisma.bird.create({
        data: {
            species_code: 'bobfly1',
            ebird_url: 'https://ebird.org/species/bobfly1',
            common_name: 'Sikatan Paruh-Perahu',
            scientific_name: 'Megarynchus pitangua',
            family: 'Tyrannidae',
            order_name: 'Passeriformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Hutan dan area berhutan tropis dan subtropis, dan juga dapat ditemukan di area semi-terbuka dengan pepohonan tinggi. Biasanya bertengger di tingkat menengah ke atas, seringkali di dalam kanopi.',
            description:
            'Burung sikatan yang besar dan mencolok dengan bagian atas berwarna zaitun kusam. Berbeda dengan Bentet-loreng Jambul-hitam (Great Kiskadee), jenis ini tidak memiliki sayap dan ekor berwarna karat terang. Paruhnya lebih kokoh, dengan punggung paruh yang lebih melengkung.',
            behavior:
            'Cukup umum dan seringkali mudah terlihat. Biasanya terlihat berpasangan atau dalam kelompok keluarga yang terdiri dari 3-5 ekor. Dikenal suka berkeliaran luas dan secara proaktif menghadapi musuh. Anakan tetap bersama induknya selama berbulan-bulan.',
            diet: 'Utamanya memakan serangga (terutama tonggeret) yang ditangkap saat terbang atau dari dedaunan. Juga memakan buah beri, buah ara liar kecil, dan buah hijau kering. Mangsa seringkali dipukulkan ke dahan sebelum dimakan.',
            nesting:
            'Membangun sarang berbentuk cawan terbuka dari ranting, biasanya dibangun oleh betina. Jumlah telur biasanya 2-3 butir berwarna keputihan dengan bercak coklat tebal. Inkubasi berlangsung 17-18 hari, dan anakan mulai terbang setelah 24-25 hari.',
            migration_pattern:
            'Umumnya penetap (sedentari), tetapi beberapa populasi mungkin berpindah ke dataran rendah setelah berkembang biak.',
            vocalization:
            'Suaranya digambarkan sebagai getaran melengking "nya, nya, nya", sangat berbeda dari suara Bentet-loreng Jambul-hitam.',
            size_length_cm: 23.0,
            size_wingspan_cm: null,
            size_weight_g: 70.0,
            finding_tips:
            'Cari mereka di puncak pohon di tepi hutan dan hutan semi-terbuka. Dengarkan suara getarannya yang khas. Sering aktif di siang hari dan terlihat dalam kelompok keluarga kecil.',
            cool_facts: [
                'Dinamai karena paruhnya yang besar, lebar, dan berkait kuat.',
                'Memukulkan mangsa serangga dengan keras ke dahan sebelum memakannya.',
                'Anakannya tinggal bersama induk selama berbulan-bulan, bahkan setelah mandiri.',
            ],
        },
    });

    const sikatanTopiKusam = await prisma.bird.create({
        data: {
            species_code: 'ducfly',
            ebird_url: 'https://ebird.org/species/ducfly',
            common_name: 'Sikatan Topi-Kusam',
            scientific_name: 'Myiarchus tuberculifer',
            family: 'Tyrannidae',
            order_name: 'Passeriformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Tersebar luas di berbagai habitat berhutan dan semi-terbuka, seperti ngarai bervegetasi pohon ek, tepi hutan hujan lembab, dan taman.',
            description:
            'Sikatan berukuran sedang dan ramping dengan mahkota yang relatif gelap, paruh ramping, perut kuning yang cukup cerah, dan pinggiran berwarna karat pada bulu sekundernya. Bagian bawah ekornya biasanya cukup gelap.',
            behavior:
            'Mencari makan di dedaunan pohon tinggi, terbang keluar dari tempat bertengger untuk menangkap serangga dari daun dan ranting, atau terkadang di udara. Di daerah musim dingin, dapat bergabung dengan kawanan burung campuran.',
            diet: 'Sebagian besar memakan serangga seperti lalat, ngengat, ulat, dan kumbang. Juga memakan beberapa buah kecil dan buah beri.',
            nesting:
            'Bersarang di lubang pohon (alami atau bekas lubang pelatuk), biasanya setinggi 3-18 meter. Sarangnya adalah gumpalan besar dari gulma, ranting, dan serat, yang dilapisi dengan bahan yang lebih lembut.',
            migration_pattern:
            'Sebagian besar penetap, tetapi populasi yang berkembang biak di Amerika Serikat dan Meksiko utara akan berpindah ke selatan saat musim dingin.',
            vocalization:
            'Panggilan yang paling umum adalah suara "wheer" yang khas, terdengar sedih dan merana.',
            size_length_cm: 17.0,
            size_wingspan_cm: 25.0,
            size_weight_g: 19.5,
            finding_tips:
            'Identifikasi paling mudah dilakukan melalui suaranya. Dengarkan panggilan "wheer" yang sedih di ngarai berhutan dan tepi hutan.',
            cool_facts: [
                'Identifikasi paling baik dikonfirmasi melalui panggilannya yang khas dan sedih, bukan dari penglihatan.',
                'Populasi yang berkembang biak di Texas baru terbentuk dalam tiga puluh tahun terakhir.',
                'Biasanya hanya ada satu ekor Sikatan Topi-Kusam dalam satu kawanan burung campuran di daerah musim dingin.',
            ],
        },
    });

    const atilaTunggirTerang = await prisma.bird.create({
        data: {
            species_code: 'brratt1',
            ebird_url: 'https://ebird.org/species/brratt1',
            common_name: 'Atila Tunggir-Terang',
            scientific_name: 'Attila spadiceus',
            family: 'Tyrannidae',
            order_name: 'Passeriformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Hutan dan area berhutan tropis dan subtropis, termasuk hutan sekunder, perkebunan, dan taman. Dapat ditemukan dari dataran rendah hingga daerah pegunungan.',
            description:
            'Sikatan yang agak besar dengan wajah menatap, mata oranye, paruh merah muda yang kokoh dan sedikit melengkung, dada bergaris-garis, dan tunggir (punggung bawah) berwarna kuning sawo terang yang terkadang sulit dilihat. Warna bulunya sangat bervariasi.',
            behavior:
            'Burung yang aktif, agresif, dan berisik, sering ditemui sendirian. Memiliki kebiasaan mengibaskan ekornya ke atas dan ke bawah dengan kuat saat bertengger. Mencari makan dari lantai hutan hingga ke kanopi.',
            diet: 'Memiliki makanan yang bervariasi termasuk serangga, laba-laba, katak, dan kadal yang ditangkap dari vegetasi atau tanah. Juga memakan buah-buahan dan biji-bijian. Terkadang mengikuti barisan semut tentara untuk menangkap mangsa yang melarikan diri.',
            nesting:
            'Membangun sarang berbentuk cangkir yang dalam dari lumut dan serat tanaman, biasanya di bawah ketinggian 3 meter di antara tanaman epifit atau di antara akar-akar penopang. Jumlah telur biasanya 3-4 butir.',
            migration_pattern:
            'Tampaknya merupakan penghuni sepanjang tahun (penetap) di seluruh wilayah sebarannya.',
            vocalization:
            'Menghasilkan nyanyian siulan yang keras dan melengking yang dapat terdengar kapan saja, terutama saat fajar. Panggilannya termasuk "beat-it, beat-it" dan suara sedih "ooo-weery-weery-woo".',
            size_length_cm: 18.0,
            size_wingspan_cm: null,
            size_weight_g: 40.0,
            finding_tips:
            'Dengarkan siulan kerasnya yang menusuk, karena lebih sering terdengar daripada terlihat. Cari gerakan di kanopi atau di cabang-cabang yang menonjol. Tunggirnya yang cerah bisa menjadi kilatan warna jika terlihat.',
            cool_facts: [
                'Juga dikenal sebagai Atila Polimorfik karena bulunya yang sangat bervariasi.',
                'Meskipun nyanyiannya keras, ia adalah ahli kamuflase.',
                'Nama spesiesnya "spadiceus" berarti "berwarna kastanye" atau "berwarna kurma".',
            ],
        },
    });

    const pentisBelang = await prisma.bird.create({
        data: {
            species_code: 'barant1',
            ebird_url: 'https://ebird.org/species/barant1',
            common_name: 'Pentis Belang',
            scientific_name: 'Thamnophilus doliatus',
            family: 'Thamnophilidae',
            order_name: 'Passeriformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Ditemukan di semak belukar, tepi hutan, vegetasi kusut, lahan semak, dan daerah tepi sungai. Menyukai dedaunan lebat di tingkat rendah.',
            description:
            'Burung pemalu dengan jambul runcing yang sering ditegakkan. Jantan dibedakan oleh garis-garis hitam-putih yang tegas ("garis narapidana"). Betina berwarna karat seperti burung cica-koreak dengan paruh yang kokoh dan bengkok.',
            behavior:
            'Biasanya terlihat berpasangan, bersifat monogami dan mempertahankan wilayah sepanjang tahun. Mencari makan di dedaunan lebat dekat tanah. Pasangan biasanya tetap dalam jangkauan pendengaran satu sama lain, sering berduet.',
            diet: 'Terutama memakan serangga dan artropoda lainnya. Juga memakan kadal kecil, buah, dan biji-bijian. Mengambil mangsa dengan gerakan menusuk yang cepat dan terkadang mengikuti kawanan semut tentara.',
            nesting:
            'Membangun sarang berbentuk cangkir terbuka yang ditenun rapat dan berdinding tipis, digantung pada cabang bercabang. Kedua jenis kelamin membangun sarang. Jumlah telur 2 (kadang-kadang 3) berwarna putih krem dengan tanda ungu.',
            migration_pattern:
            'Penghuni sepanjang tahun (penetap) di seluruh wilayah sebarannya yang luas.',
            vocalization:
            'Kedua jenis kelamin bernyanyi. Nyanyiannya berupa serangkaian nada tawa atau cekikikan yang keras, yang temponya meningkat cepat lalu menurun, diakhiri dengan nada penutup yang tegas.',
            size_length_cm: 16.5,
            size_wingspan_cm: null,
            size_weight_g: 28.0,
            finding_tips:
            'Dengarkan nyanyian "cekikikan" yang khas, karena pasangan sering berduet tetapi tetap tersembunyi. Cari mereka berpasangan saat mencari makan di semak belukar yang lebat dan tepi hutan.',
            cool_facts: [
                'Jantan memiliki garis-garis hitam-putih yang mencolok seperti "baju narapidana".',
                'Pasangan bersifat monogami dan dengan gigih mempertahankan wilayahnya sepanjang tahun.',
                'Saat bernyanyi, mereka meregangkan leher, membungkuk ke depan, dan menggerakkan ekor ke atas dan ke bawah.',
            ],
        },
    });

    const bubutTupai = await prisma.bird.create({
        data: {
            species_code: 'squcuc1',
            ebird_url: 'https://ebird.org/species/squcuc1',
            common_name: 'Bubut-tupai',
            scientific_name: 'Piaya cayana',
            family: 'Cuculidae',
            order_name: 'Cuculiformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Tersebar luas di dataran rendah dan kaki bukit tropis. Menghuni berbagai habitat berhutan dan tepi hutan, dari hutan kering hingga lembab.',
            description:
            'Burung yang sangat mencolok dengan ekor panjang dan bulu berwarna karat terang. Tidak ada spesies serupa di Meksiko dan Amerika Tengah. Bagian bawah bulu ekornya bervariasi secara geografis dari karat hingga kehitaman.',
            behavior:
            'Dinamai karena gerakannya yang seperti tupai, berlari di sepanjang dahan pohon. Sebagian besar mencari makan secara diam-diam di tingkat menengah ke atas di pepohonan. Sering terlihat menyambar melintasi jalan. Biasanya sendirian atau berpasangan.',
            diet: 'Sebagian besar memakan serangga besar seperti ulat, belalang, dan tonggeret. Juga memangsa kadal kecil dan katak. Mengintai mangsa secara diam-diam dan mengambilnya dari dedaunan. Jarang memakan buah.',
            nesting:
            'Bukan parasit indukan. Membangun sarang berbentuk cangkir dari ranting dan daun di puncak pohon. Kedua jenis kelamin membangun sarang, mengerami 1-3 telur putih, dan memberi makan anak-anaknya.',
            migration_pattern: 'Spesies penetap di seluruh wilayah sebarannya.',
            vocalization:
            'Jarang bersuara. Panggilan kerasnya termasuk suara ledakan "kiik! wahh" dan getaran "ch\'kerr". Nyanyiannya berupa serangkaian siulan "whip".',
            size_length_cm: 45.0,
            size_wingspan_cm: null,
            size_weight_g: 105.0,
            finding_tips:
            'Sering terlihat saat menyambar melintasi jalan atau area terbuka. Cari gerakan seperti tupai di sepanjang dahan di tajuk tengah dan atas area berhutan. Dengarkan panggilannya yang jarang namun keras dan meledak-ledak.',
            cool_facts: [
                'Dinamai karena gerakannya yang seperti tupai di sepanjang dahan.',
                'Tidak seperti banyak burung bubut lainnya, ia membangun sarangnya sendiri dan membesarkan anak-anaknya.',
                'Anakan Bubut-tupai memiliki bintik-bintik putih tebal di dalam mulutnya, mungkin untuk membantu induk menemukan mulut mereka di sarang yang gelap.',
            ],
        },
    });

    const pentisBesar = await prisma.bird.create({
        data: {
            species_code: 'greant1',
            ebird_url: 'https://ebird.org/species/greant1',
            common_name: 'Pentis Besar',
            scientific_name: 'Taraba major',
            family: 'Thamnophilidae',
            order_name: 'Passeriformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Ditemukan di lapisan bawah hutan yang lebat, semak belukar, sulur-suluran, dan perbatasan hutan, seringkali di dataran rendah tropis yang lembab. Juga menghuni hutan galeri dan sabana berhutan.',
            description:
            'Burung dengan pola yang mencolok tetapi sangat pemalu. Jantan berwarna hitam di atas, sementara betina berwarna karat di atas; keduanya memiliki bagian bawah putih bersih, mata merah cerah, paruh bengkok yang kokoh, dan jambul.',
            behavior:
            'Burung yang sangat pemalu yang lebih sering terdengar daripada terlihat. Biasanya bernyanyi dari dalam sulur-suluran yang lebat. Mencari makan sendiri atau berpasangan di dekat tanah dalam vegetasi lebat.',
            diet: 'Memakan serangga dan artropoda lain yang diambil dari dedaunan, serta kadal kecil dan mamalia. Terkadang mengikuti kawanan semut.',
            nesting:
            'Membangun sarang berbentuk cangkir dalam yang dilapisi bahan lembut, ditempatkan di semak-semak. Jumlah telur 2 (kadang 3). Kedua jenis kelamin mengerami telur selama 17-18 hari, dan anak-anaknya terbang setelah 12-13 hari.',
            migration_pattern:
            'Dianggap sebagai penghuni sepanjang tahun di sebagian besar wilayahnya, meskipun beberapa pergerakan musiman diduga terjadi di bagian selatan.',
            vocalization:
            'Nyanyiannya adalah serangkaian nada yang panjang dan semakin cepat, seringkali diakhiri dengan suara geraman. Suaranya menyerupai beberapa jenis luntur. Ia juga memiliki berbagai panggilan getar dan geraman.',
            size_length_cm: 20.0,
            size_wingspan_cm: null,
            size_weight_g: 58.0,
            finding_tips:
            'Spesies ini lebih sering terdengar daripada terlihat. Dengarkan nyanyiannya yang khas, yang terdengar seperti luntur tetapi diakhiri dengan geraman pelan. Carilah di vegetasi rendah yang sangat lebat.',
            cool_facts: [
                'Ini adalah satu-satunya anggota dari genus Taraba.',
                'Nama genus Taraba adalah anagram dari nama genus semut-semutan lain, Batara.',
                'Jantan memiliki bercak putih tersembunyi di punggungnya yang diperlihatkan saat merasa terancam.',
            ],
        },
    });

    const cicaKoreakDadaKuningTua = await prisma.bird.create({
        data: {
            species_code: 'bubwre1',
            ebird_url: 'https://ebird.org/species/bubwre1',
            common_name: 'Cica-koreak Dada-kuning-tua',
            scientific_name: 'Cantorchilus leucotis',
            family: 'Troglodytidae',
            order_name: 'Passeriformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Biasanya ditemukan di tingkat bawah hutan dataran rendah, hutan sekunder, dan daerah tepi sungai, seringkali di dekat air. Juga ditemukan di hutan bakau dan perkebunan.',
            description:
            'Cica-koreak berukuran sedang yang tampak biasa saja, dengan bagian atas berwarna coklat hangat, garis-garis gelap di sayap dan ekor, pipi dan tenggorokan putih pucat yang memudar menjadi perut kuning kecoklatan, serta alis putih yang jelas.',
            behavior:
            'Ditemukan berpasangan atau dalam kelompok keluarga. Mencari makan secara aktif di vegetasi lebat dari tingkat rendah hingga tanah. Paling mudah dideteksi dari nyanyiannya, yang merupakan duet merdu yang dibawakan oleh pasangan.',
            diet: 'Memakan serangga, laba-laba, dan artropoda kecil lainnya. Berburu dengan cara mematuk dan menyelidiki vegetasi yang lebat.',
            nesting:
            'Membangun dua jenis sarang: sarang untuk berkembang biak dan sarang "asrama" untuk bertengger. Sarang berbentuk bola dengan pintu masuk terowongan, ditempatkan di pohon atau semak. Jumlah telur biasanya 3.',
            migration_pattern:
            'Dianggap sebagai spesies penetap di seluruh wilayah sebarannya.',
            vocalization:
            'Nyanyiannya adalah duet yang kaya dan bergelombang, biasanya menggabungkan nada-nada tinggi dengan kicauan rendah yang cepat. Pasangan memiliki repertoar lagu yang luas.',
            size_length_cm: 15.0,
            size_wingspan_cm: null,
            size_weight_g: 19.0,
            finding_tips:
            'Paling mudah dideteksi melalui nyanyian duetnya yang merdu. Cari pasangan yang bergerak melalui vegetasi lebat dan rendah di hutan, terutama di dekat sungai atau rawa.',
            cool_facts: [
                'Membangun dua jenis sarang: satu untuk berkembang biak dan satu lagi sarang "asrama" untuk beristirahat.',
                'Pasangan melakukan duet yang kompleks dan indah, di mana satu burung memulai lagu dan yang lain menyelesaikannya.',
                'Spesies ini sering menjadi korban parasitisme sarang oleh Kedasi (Shiny Cowbird) dan Bubut Garis (Striped Cuckoo).',
            ],
        },
    });

    const merayapPohonZaitun = await prisma.bird.create({
        data: {
            species_code: 'oliwoo1',
            ebird_url: 'https://ebird.org/species/oliwoo1',
            common_name: 'Merayap-pohon Zaitun',
            scientific_name: 'Sittasomus griseicapillus',
            family: 'Furnariidae',
            order_name: 'Passeriformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Ditemukan di hutan lembab tropis dan subtropis, termasuk hutan primer dan sekunder, perkebunan, hutan bakau, dan bahkan taman kota berhutan.',
            description:
            'Burung merayap-pohon kecil dan polos, dibedakan oleh ukurannya yang kecil, paruh ramping, dan penampilan tanpa garis. Kepala dan bagian bawahnya berwarna abu-abu polos kontras dengan punggung, sayap, dan ekornya yang berwarna karat.',
            behavior:
            'Cukup umum tetapi tidak menonjol. Bergerak cepat menaiki batang pohon dan di sepanjang dahan, sering terbang rendah ke pohon berikutnya dan berputar ke atas lagi. Sering mencari makan sendirian tetapi sering bergabung dengan kawanan makan campuran.',
            diet: 'Terutama memakan artropoda seperti kumbang dan semut. Juga mengonsumsi biji-bijian, buah, dan kadang-kadang vertebrata kecil. Mematuk mangsa dari batang dan cabang dan kadang-kadang menangkap serangga terbang di udara.',
            nesting:
            'Bersarang di lubang, menggunakan lubang alami atau bekas lubang pelatuk; tidak menggali sendiri. Sarangnya dilapisi dengan daun-daun mati. Jumlah telur 2-3 butir.',
            migration_pattern:
            'Penghuni sepanjang tahun di seluruh wilayah sebarannya yang luas.',
            vocalization:
            'Suara sangat bervariasi di seluruh wilayahnya. Panggilan bisa berupa getaran cepat dan bernada tinggi atau serangkaian siulan jernih yang bergantian.',
            size_length_cm: 16.0,
            size_wingspan_cm: null,
            size_weight_g: 13.0,
            finding_tips:
            'Cari burung merayap-pohon kecil dan polos yang memanjat batang pohon di hutan lembab. Sering bergabung dengan kawanan campuran. Dengarkan getaran dan siulan bernada tinggi yang bervariasi menurut wilayah.',
            cool_facts: [
                'Tidak seperti kebanyakan burung merayap-pohon lainnya, ia tidak memiliki garis-garis atau bintik-bintik di tubuhnya.',
                'Suaranya sangat bervariasi secara geografis sehingga dianggap sebagai kandidat untuk dipecah menjadi beberapa spesies.',
                'Dikenal bergaul dengan kelompok tamarin yang mencari makan untuk menyambar mangsa yang dikejutkan oleh mereka.',
            ],
        },
    });

    const merayapPohonKerongkonganKuningTua = await prisma.bird.create({
        data: {
            species_code: 'butwoo1',
            ebird_url: 'https://ebird.org/species/butwoo1',
            common_name: 'Merayap-pohon Kerongkongan-kuning-tua',
            scientific_name: 'Xiphorhynchus guttatus',
            family: 'Furnariidae',
            order_name: 'Passeriformes',
            conservation_status: 'Risiko Rendah',
            habitat:
            'Ditemukan di hutan hujan hijau abadi, tepi hutan, hutan galeri, rawa palem, dan hutan bakau. Umum di hutan primer maupun di daerah dekat pemukiman manusia dengan tepi hutan.',
            description:
            'Burung merayap-pohon besar yang tersebar luas dengan tenggorokan berwarna kuning tua (yang bisa sulit dilihat), warna coklat kemerahan, garis-garis kuning tua di kepala dan dada, serta paruh yang berat dan relatif panjang.',
            behavior:
            'Burung yang sangat vokal, lebih sering terdengar daripada terlihat. Biasanya mencari makan sendirian, memanjat batang pohon dan dahan. Secara teratur bergabung dengan kawanan makan campuran dan mengikuti kawanan semut tentara.',
            diet: 'Sebagian besar memakan artropoda (seperti semut dan serangga) dan kadang-kadang vertebrata kecil. Mematuk mangsa dari substrat, dan terkadang menyambar mangsa yang melarikan diri dari semut tentara.',
            nesting:
            'Bersarang di lubang pohon mati (alami atau buatan pelatuk), melapisi sarang dengan kulit kayu. Jumlah telur terdiri dari 1-3 butir telur putih.',
            migration_pattern:
            'Semua subspesies diyakini sebagai penghuni sepanjang tahun.',
            vocalization:
            'Sangat vokal, dengan nyanyian yang bervariasi secara geografis. Panggilan umum adalah serangkaian nada "chew" yang kaya, naik-turun, atau suara keras "chev-re chev-re".',
            size_length_cm: 26.0,
            size_wingspan_cm: null,
            size_weight_g: 60.0,
            finding_tips:
            'Spesies ini lebih sering terdengar daripada terlihat. Dengarkan serangkaian nada siulan yang keras, khas, naik-turun di hutan dataran rendah dan tepiannya. Mungkin juga ditemukan mengikuti kawanan semut tentara.',
            cool_facts: [
                'Ini adalah anggota terbesar dari genus Xiphorhynchus.',
                'Nama ilmiahnya Xiphorhynchus berarti "paruh pedang" dalam bahasa Yunani.',
                'Anakannya memiliki paruh yang lebih pendek dan lebih hitam daripada dewasa.',
            ],
        },
    });

    // Seed foto_voice data
    const fotoVoiceData = [
        {
            id: 1,
            foto_url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtp_gQAcPSlPk6TZqRU4F9KeZgOUtywXqXfAp4_lXeLqccTvKkRpwOPmkmlxeJE0li53T49XojAzKYzLq4nMvONYfqI8fEm3_-lLCpfZsAGjLnd0U9V0vOMi55ZrEXyMtC6EASBjKsnzo/s2048/17DSCF7604.jpg',
            bird_id: 1,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 2,
            foto_url: 'https://www.birdguides-cdn.com/cdn/gallery/birdguides/d42c9c30-0445-474d-a906-fdd63ec77c93.jpg?&format=webp&webp.quality=85&scale=down',
            bird_id: 2,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 3,
            foto_url: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/321026611/640',
            bird_id: 3,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 4,
            foto_url: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/48364851/1200',
            bird_id: 4,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 5,
            foto_url: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/218227141/320',
            bird_id: 5,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 6,
            foto_url: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/612374232/320',
            bird_id: 6,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 7,
            foto_url: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/613697919/640',
            bird_id: 7,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 8,
            foto_url: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/304918291/1200',
            bird_id: 8,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 9,
            foto_url: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/621782682/640',
            bird_id: 9,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        },
        {
            id: 10,
            foto_url: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/43407981/1200',
            bird_id: 10,
            created_at: new Date('2025-06-05T16:36:36.860553Z')
        }
    ]

    for (const fotoVoice of fotoVoiceData) {
        await prisma.fotoVoice.create({
            data: fotoVoice
        })
    }

    console.log('Seeding completed!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
