import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="800" height="900" viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background glow -->
    <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#D4AF37" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#060B19" stop-opacity="0"/>
    </radialGradient>

    <!-- Gold Gradients -->
    <linearGradient id="goldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="35%" stop-color="#FFF0BE"/>
      <stop offset="60%" stop-color="#D4AF37"/>
      <stop offset="85%" stop-color="#AA820A"/>
      <stop offset="100%" stop-color="#F3E5AB"/>
    </linearGradient>

    <linearGradient id="goldHori" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#F3E5AB"/>
      <stop offset="100%" stop-color="#AA820A"/>
    </linearGradient>

    <!-- Spine gradient -->
    <linearGradient id="spineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#040812"/>
      <stop offset="30%" stop-color="#0B1530"/>
      <stop offset="80%" stop-color="#070E22"/>
      <stop offset="100%" stop-color="#02050D"/>
    </linearGradient>

    <!-- Cover gradient -->
    <linearGradient id="coverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1736"/>
      <stop offset="40%" stop-color="#0E1E46"/>
      <stop offset="80%" stop-color="#09132C"/>
      <stop offset="100%" stop-color="#050B1A"/>
    </linearGradient>

    <!-- Pages gradient -->
    <linearGradient id="pagesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E5D8B8"/>
      <stop offset="50%" stop-color="#C5B692"/>
      <stop offset="100%" stop-color="#A59570"/>
    </linearGradient>

    <!-- Shadow -->
    <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Bible light rays -->
    <radialGradient id="divineRays" cx="50%" cy="60%" r="40%">
      <stop offset="0%" stop-color="#FFF5CC" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#D4AF37" stop-opacity="0.5"/>
      <stop offset="80%" stop-color="#D4AF37" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>

    <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="400" cy="820" rx="320" ry="45" fill="url(#floorShadow)"/>
  
  <!-- Backdrop ambient glow -->
  <circle cx="430" cy="460" r="300" fill="url(#auraGlow)"/>

  <!-- Book Group with slight 3D angle -->
  <g transform="translate(140, 70)">
    
    <!-- Spine of the Book (3D left side) -->
    <!-- Spine polygon: 0,35 to 65,0 to 65,710 to 0,745 -->
    <path d="M 0,40 L 65,0 L 65,705 L 0,745 Z" fill="url(#spineGradient)" stroke="#22355F" stroke-width="1.5"/>

    <!-- Spine gold ribs & decorations -->
    <line x1="5" y1="95" x2="60" y2="58" stroke="url(#goldLinear)" stroke-width="2.5"/>
    <line x1="5" y1="102" x2="60" y2="65" stroke="url(#goldLinear)" stroke-width="1.5"/>

    <!-- Spine Title text (vertical) -->
    <g transform="translate(38, 380) rotate(-90)">
      <text x="0" y="0" text-anchor="middle" font-family="'Cinzel', serif, 'Times New Roman'" font-size="16" font-weight="700" fill="url(#goldLinear)" letter-spacing="4">CÓDIGO DIVINO • FINANÇAS</text>
      <text x="0" y="16" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#F3E5AB" letter-spacing="2">JÚNIOR LIMA</text>
    </g>

    <line x1="5" y1="675" x2="60" y2="640" stroke="url(#goldLinear)" stroke-width="1.5"/>
    <line x1="5" y1="682" x2="60" y2="647" stroke="url(#goldLinear)" stroke-width="2.5"/>

    <!-- Front Cover (65,0 to 520,30 to 520,735 to 65,705) -->
    <path d="M 65,0 L 520,32 L 520,736 L 65,705 Z" fill="url(#coverGradient)" stroke="#D4AF37" stroke-width="1"/>

    <!-- Front Cover Inner Border Frame (Luxury Gold Filigree) -->
    <path d="M 90,26 L 495,54 L 495,712 L 90,683 Z" fill="none" stroke="url(#goldLinear)" stroke-width="3"/>
    <path d="M 98,34 L 487,61 L 487,704 L 98,676 Z" fill="none" stroke="url(#goldLinear)" stroke-width="1" stroke-dasharray="8,4"/>
    
    <!-- Ornate Corner Accents -->
    <!-- Top-Left corner -->
    <path d="M 90,45 L 115,45 L 115,26 M 105,40 L 105,32" fill="none" stroke="url(#goldLinear)" stroke-width="2"/>
    <!-- Top-Right corner -->
    <path d="M 470,52 L 495,54 L 495,75" fill="none" stroke="url(#goldLinear)" stroke-width="2"/>
    <!-- Bottom-Left corner -->
    <path d="M 90,660 L 90,683 L 115,683" fill="none" stroke="url(#goldLinear)" stroke-width="2"/>
    <!-- Bottom-Right corner -->
    <path d="M 470,710 L 495,712 L 495,690" fill="none" stroke="url(#goldLinear)" stroke-width="2"/>

    <!-- Cover Content (transformed slightly to match isometric face) -->
    <g transform="translate(65, 0) matrix(0.97 0.07 0 1 0 0)">
      
      <!-- Crown / Sacred Emblem top -->
      <g transform="translate(225, 85)" filter="url(#glowFilter)">
        <polygon points="0,-18 5,-8 16,-10 9,2 14,14 2,9 -10,14 -5,2 -12,-10 -3,-8" fill="url(#goldLinear)"/>
      </g>

      <!-- Main Title -->
      <text x="225" y="145" text-anchor="middle" font-family="'Cinzel', serif, 'Times New Roman'" font-size="34" font-weight="900" fill="url(#goldLinear)" letter-spacing="3" filter="url(#glowFilter)">
        CÓDIGO DIVINO
      </text>

      <text x="225" y="180" text-anchor="middle" font-family="'Cinzel', serif, 'Times New Roman'" font-size="22" font-weight="700" fill="#F3E5AB" letter-spacing="2">
        FINANÇAS BÍBLICAS
      </text>

      <!-- Subtitle -->
      <text x="225" y="215" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#E2E8F0" opacity="0.9">
        Princípios do Reino para uma Vida de Prosperidade
      </text>
      <text x="225" y="233" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#E2E8F0" opacity="0.9">
        Abundante, Livre de Dívidas e com Propósito
      </text>

      <!-- 3 Symbols: Menorah, Tree of Life, Cross -->
      <g transform="translate(225, 290)">
        <!-- Menorah (Left) -->
        <g transform="translate(-85, 0) scale(0.9)" stroke="url(#goldLinear)" stroke-width="2" fill="none">
          <line x1="0" y1="22" x2="0" y2="-12"/>
          <path d="M -16,-6 C -16,10 16,10 16,-6"/>
          <path d="M -10,-2 C -10,12 10,12 10,-2"/>
          <line x1="-12" y1="22" x2="12" y2="22"/>
          <circle cx="0" cy="-14" r="2.5" fill="#FFF0BE"/>
          <circle cx="-16" cy="-8" r="2.5" fill="#FFF0BE"/>
          <circle cx="16" cy="-8" r="2.5" fill="#FFF0BE"/>
          <circle cx="-10" cy="-4" r="2.5" fill="#FFF0BE"/>
          <circle cx="10" cy="-4" r="2.5" fill="#FFF0BE"/>
        </g>

        <!-- Tree of Life (Center) -->
        <g transform="translate(0, -5) scale(0.95)" fill="url(#goldLinear)">
          <path d="M -3,25 L 3,25 L 2,2 C 12,0 20,-12 15,-22 C 8,-28 -8,-28 -15,-22 C -20,-12 -12,0 -2,2 Z"/>
          <circle cx="-10" cy="-12" r="3" fill="#FFF0BE"/>
          <circle cx="0" cy="-18" r="3.5" fill="#FFF0BE"/>
          <circle cx="10" cy="-12" r="3" fill="#FFF0BE"/>
          <circle cx="-5" cy="-7" r="2.5" fill="#FFF0BE"/>
          <circle cx="6" cy="-6" r="2.5" fill="#FFF0BE"/>
        </g>

        <!-- Latin Cross (Right) -->
        <g transform="translate(85, -5) scale(0.95)" fill="url(#goldLinear)">
          <rect x="-3" y="-20" width="6" height="42" rx="1.5"/>
          <rect x="-14" y="-10" width="28" height="6" rx="1.5"/>
          <circle cx="0" cy="-7" r="2" fill="#FFF0BE"/>
        </g>
      </g>

      <!-- Divine light radiating behind the Bible -->
      <circle cx="225" cy="450" r="140" fill="url(#divineRays)"/>

      <!-- Open Holy Scriptures / Illuminated Bible (Centerpiece) -->
      <g transform="translate(225, 455)" filter="url(#glowFilter)">
        <!-- Scrolls handles left & right -->
        <rect x="-135" y="-35" width="12" height="70" rx="4" fill="url(#goldLinear)" stroke="#785B07"/>
        <rect x="123" y="-35" width="12" height="70" rx="4" fill="url(#goldLinear)" stroke="#785B07"/>
        <circle cx="-129" cy="-40" r="8" fill="url(#goldLinear)"/>
        <circle cx="-129" cy="40" r="8" fill="url(#goldLinear)"/>
        <circle cx="129" cy="-40" r="8" fill="url(#goldLinear)"/>
        <circle cx="129" cy="40" r="8" fill="url(#goldLinear)"/>

        <!-- Bible Open Pages Left -->
        <path d="M 0,25 C -45,15 -90,20 -120,5 L -120,-38 C -90,-25 -45,-30 0,-18 Z" fill="#FFF4D4" stroke="#D4AF37" stroke-width="2"/>
        <!-- Bible Open Pages Right -->
        <path d="M 0,25 C 45,15 90,20 120,5 L 120,-38 C 90,-25 45,-30 0,-18 Z" fill="#FFF4D4" stroke="#D4AF37" stroke-width="2"/>
        
        <!-- Center Book Fold -->
        <line x1="0" y1="-18" x2="0" y2="25" stroke="#AA820A" stroke-width="3"/>

        <!-- Ancient text lines on parchment -->
        <g stroke="#967B40" stroke-width="1.5" stroke-linecap="round" opacity="0.75">
          <line x1="-105" y1="-20" x2="-20" y2="-12"/>
          <line x1="-105" y1="-12" x2="-25" y2="-4"/>
          <line x1="-105" y1="-4" x2="-20" y2="4"/>
          <line x1="-105" y1="4" x2="-35" y2="10"/>

          <line x1="20" y1="-12" x2="105" y2="-20"/>
          <line x1="25" y1="-4" x2="105" y2="-12"/>
          <line x1="20" y1="4" x2="105" y2="-4"/>
          <line x1="35" y1="10" x2="105" y2="4"/>
        </g>
      </g>

      <!-- Author section at bottom -->
      <line x1="120" y1="585" x2="330" y2="585" stroke="url(#goldLinear)" stroke-width="1"/>
      <circle cx="225" cy="585" r="4" fill="url(#goldLinear)"/>

      <text x="225" y="625" text-anchor="middle" font-family="'Cinzel', serif" font-size="19" font-weight="700" fill="url(#goldLinear)" letter-spacing="2">
        AUTOR: JÚNIOR LIMA
      </text>
      <text x="225" y="646" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="500" fill="#CBD5E1" letter-spacing="1">
        EDIÇÃO ESPECIAL DE LUXO
      </text>

    </g>

    <!-- Hardcover Spine Ridge Lighting Highlight -->
    <path d="M 64,0 L 68,0 L 68,705 L 64,705 Z" fill="#FFEAA5" opacity="0.6"/>
  </g>
</svg>
`;

async function generateCover() {
  try {
    const outputDir = path.resolve('public');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, 'livro.png');
    await sharp(Buffer.from(svg))
      .png({ quality: 95 })
      .toFile(outputPath);
    console.log('Successfully generated public/livro.png at', outputPath);
  } catch (err) {
    console.error('Error generating image:', err);
  }
}

generateCover();
