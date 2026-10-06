export type StepField =
  | 'formato'
  | 'queEs'
  | 'tema'
  | 'estilo'
  | 'textoExacto'
  | 'tipografiaPaleta'
  | 'evita';

export interface ExampleContent {
  text: string;
  image?: string;
}

export interface StepOption {
  value: string;
  label: string;
  description?: string;
  example?: string | ExampleContent;
  exampleImage?: string;
}

export interface StepConfig {
  id: number;
  field: StepField;
  title: string;
  subtitle: string;
  options: StepOption[];
}

export const stepsData: StepConfig[] = [
  {
    id: 1,
    field: 'formato',
    title: 'Formato',
    subtitle: 'Proporción y orientación de la pieza',
    options: [
      { value: 'Vertical 4:5', label: 'Vertical 4:5', description: 'Instagram / Cartel estándar', example: 'Ej. cartel 1080×1350 con sujeto centrado y aire superior' , exampleImage: '/tooltips/formato-ej-cartel-10801350-con-sujeto-.svg' },
      { value: 'Vertical 9:16', label: 'Vertical 9:16', description: 'Historias / Reels', example: 'Ej. historia 1080×1920 con titular arriba y sujeto abajo' , exampleImage: '/tooltips/formato-ej-historia-10801920-con-titul.svg' },
      { value: 'Cuadrado 1:1', label: 'Cuadrado 1:1', description: 'Publicación cuadrada', example: 'Ej. post 1080×1080 con sujeto centrado y marco libre' , exampleImage: '/tooltips/formato-ej-post-10801080-con-sujeto-ce.svg' },
      { value: 'Horizontal 16:9', label: 'Horizontal 16:9', description: 'Banner / Cabecera', example: 'Ej. banner 1920×1080 con titular a la izquierda' , exampleImage: '/tooltips/formato-ej-banner-19201080-con-titular.svg' },
    ],
  },
  {
    id: 2,
    field: 'queEs',
    title: 'Qué es',
    subtitle: 'Tipo de imagen y para qué se usará',
    options: [
      { value: 'Cartel de exposición', label: 'Cartel de exposición', example: 'Ej. cartel A2 con pieza central y fecha abajo' , exampleImage: '/tooltips/queEs-ej-cartel-a2-con-pieza-central.svg' },
      { value: 'Afiche publicitario', label: 'Afiche publicitario', example: 'Ej. afiche con titular grande y producto al centro' , exampleImage: '/tooltips/queEs-ej-afiche-con-titular-grande-y.svg' },
      { value: 'Portada de carrusel', label: 'Portada de carrusel', example: 'Ej. portada cuadrada con gancho + «desliza →»' , exampleImage: '/tooltips/queEs-ej-portada-cuadrada-con-gancho.svg' },
      { value: 'Vista explosionada / despiece', label: 'Vista explosionada / despiece', example: 'Ej. piezas flotando en eje vertical con etiquetas' , exampleImage: '/tooltips/queEs-ej-piezas-flotando-en-eje-vert.svg' },
      { value: 'Blueprint / plano técnico', label: 'Blueprint / plano técnico', example: 'Ej. plano azul con vistas frontal y lateral' , exampleImage: '/tooltips/queEs-ej-plano-azul-con-vistas-front.svg' },
      { value: 'Knolling', label: 'Knolling', example: 'Ej. objetos en ángulo recto vistos desde arriba' , exampleImage: '/tooltips/queEs-ej-objetos-en-ángulo-recto-vis.svg' },
      { value: 'Rayos X', label: 'Rayos X', example: 'Ej. objeto semitransparente con interior visible' , exampleImage: '/tooltips/queEs-ej-objeto-semitransparente-con.svg' },
      { value: 'Corte en sección (Cutaway)', label: 'Corte en sección (Cutaway)', example: 'Ej. producto cortado mostrando capas internas' , exampleImage: '/tooltips/queEs-ej-producto-cortado-mostrando-.svg' },
      { value: 'Infografía explicativa', label: 'Infografía explicativa', example: 'Ej. 3 bloques con icono + dato + flecha de flujo' , exampleImage: '/tooltips/queEs-ej-3-bloques-con-icono-dato-fl.svg' },
      { value: 'Anatomía de producto', label: 'Anatomía de producto', example: 'Ej. producto etiquetado parte por parte' , exampleImage: '/tooltips/queEs-ej-producto-etiquetado-parte-p.svg' },
      { value: 'Packaging mockup', label: 'Packaging mockup', example: 'Ej. caja 3D en perspectiva con etiqueta frontal' , exampleImage: '/tooltips/queEs-ej-caja-3d-en-perspectiva-con-.svg' },
    ],
  },
  {
    id: 3,
    field: 'tema',
    title: 'Tema',
    subtitle: 'Contenido, escena o composición principal',
    options: [
      { value: 'Objeto o sujeto central único con datos clave', label: 'Sujeto central único', description: 'Objeto o sujeto central único con datos clave', example: 'Ej. guitarra al centro con fecha y sede debajo' , exampleImage: '/tooltips/tema-ej-guitarra-al-centro-con-fech.svg' },
      { value: 'Piezas despiezadas y flotando en su eje', label: 'Despiece flotante', description: 'Piezas despiezadas y flotando en su eje', example: 'Ej. tornillos y carcasa flotando en su eje' , exampleImage: '/tooltips/tema-ej-tornillos-y-carcasa-flotand.svg' },
      { value: 'Composición cenital plana con elementos en ángulo recto', label: 'Cenital plana', description: 'Composición cenital plana con elementos en ángulo recto', example: 'Ej. entradas y pulseras ordenadas en cuadrícula' , exampleImage: '/tooltips/tema-ej-entradas-y-pulseras-ordenad.svg' },
      { value: 'Plano con líneas finas sobre azul, vista frontal y lateral', label: 'Plano técnico azul', description: 'Plano con líneas finas sobre azul, vista frontal y lateral', example: 'Ej. escenario dibujado en líneas finas sobre azul' , exampleImage: '/tooltips/tema-ej-escenario-dibujado-en-línea.svg' },
    ],
  },
  {
    id: 4,
    field: 'estilo',
    title: 'Estilo',
    subtitle: 'Dirección visual con nombre propio (sin adjetivos vacíos)',
    options: [
      { value: 'Swiss / International Typographic Style', label: 'Swiss / International Typographic Style', description: 'Movimiento', example: 'Ej. retícula sobria con titular Helvética y rojo plano' , exampleImage: '/tooltips/estilo-ej-retícula-sobria-con-titular.svg' },
      { value: 'Constructivismo', label: 'Constructivismo', description: 'Movimiento', example: 'Ej. diagonales rojas con tipografía inclinada' , exampleImage: '/tooltips/estilo-ej-diagonales-rojas-con-tipogr.svg' },
      { value: 'Bauhaus', label: 'Bauhaus', description: 'Movimiento', example: 'Ej. círculos y barras primarias sobre crema' , exampleImage: '/tooltips/estilo-ej-círculos-y-barras-primarias.svg' },
      { value: 'Art Nouveau', label: 'Art Nouveau', description: 'Movimiento', example: 'Ej. orlas florales con letra ondulada dorada' , exampleImage: '/tooltips/estilo-ej-orlas-florales-con-letra-on.svg' },
      { value: 'De Stijl', label: 'De Stijl', description: 'Movimiento', example: 'Ej. bloques rojo/azul/amarillo con líneas negras' , exampleImage: '/tooltips/estilo-ej-bloques-rojoazulamarillo-co.svg' },
      { value: 'Memphis / 80s', label: 'Memphis / 80s', description: 'Movimiento', example: 'Ej. zigzags pastel con tipografía playful' , exampleImage: '/tooltips/estilo-ej-zigzags-pastel-con-tipograf.svg' },
      { value: 'Brutalismo gráfico', label: 'Brutalismo gráfico', description: 'Movimiento', example: 'Ej. bloque negro macizo con letra blanca cruda' , exampleImage: '/tooltips/estilo-ej-bloque-negro-macizo-con-let.svg' },
      { value: 'Editorial Contemporáneo', label: 'Editorial Contemporáneo', description: 'Movimiento', example: 'Ej. portada limpia con serif grande y aire' , exampleImage: '/tooltips/estilo-ej-portada-limpia-con-serif-gr.svg' },
      { value: 'Secesión Vienesa', label: 'Secesión Vienesa', description: 'Movimiento', example: 'Ej. marco dorado geométrico con letra alta' , exampleImage: '/tooltips/estilo-ej-marco-dorado-geométrico-con.svg' },
      { value: 'Arts and Crafts', label: 'Arts and Crafts', description: 'Movimiento', example: 'Ej. bordes vegetales con letra artesanal' , exampleImage: '/tooltips/estilo-ej-bordes-vegetales-con-letra-.svg' },
      { value: 'Ukiyo-e', label: 'Ukiyo-e', description: 'Tradición', example: 'Ej. olas planas y sol rojo estilo grabado japonés' , exampleImage: '/tooltips/estilo-ej-olas-planas-y-sol-rojo-esti.svg' },
      { value: 'WPA / New Deal', label: 'WPA / New Deal', description: 'Tradición', example: 'Ej. cartel serigráfico con atardecer degradado' , exampleImage: '/tooltips/estilo-ej-cartel-serigráfico-con-atar.svg' },
      { value: 'Flyer Hip Hop 80s', label: 'Flyer Hip Hop 80s', description: 'Tradición', example: 'Ej. letras gruesas con borde sobre foto' , exampleImage: '/tooltips/estilo-ej-letras-gruesas-con-borde-so.svg' },
      { value: 'Cartel de viaje clásico', label: 'Cartel de viaje clásico', description: 'Tradición', example: 'Ej. tren + montaña con banda inferior' , exampleImage: '/tooltips/estilo-ej-tren-montaña-con-banda-infe.svg' },
      { value: 'Risografía', label: 'Risografía', description: 'Técnica / Digital', example: 'Ej. tramas granuladas rosa y azul superpuestas' , exampleImage: '/tooltips/estilo-ej-tramas-granuladas-rosa-y-az.svg' },
      { value: 'Cutout Collage / Zine', label: 'Cutout Collage / Zine', description: 'Técnica / Digital', example: 'Ej. recortes rasgados con cinta visible' , exampleImage: '/tooltips/estilo-ej-recortes-rasgados-con-cinta.svg' },
      { value: 'Pixel Art + Art Deco', label: 'Pixel Art + Art Deco', description: 'Mezcla', example: 'Ej. arcos dorados en píxeles sobre negro' , exampleImage: '/tooltips/estilo-ej-arcos-dorados-en-píxeles-so.svg' },
    ],
  },
  {
    id: 5,
    field: 'textoExacto',
    title: 'Texto exacto',
    subtitle: 'Textos literales que aparecerán en la imagen',
    options: [],
  },
  {
    id: 6,
    field: 'tipografiaPaleta',
    title: 'Tipografía y paleta',
    subtitle: 'Fuente y 2-3 colores clave',
    options: [
      { value: 'Sans-serif recta; rojo, negro y crema', label: 'Sans recta', description: 'Rojo, negro y crema', example: 'Ej. grotesk recta en rojo/negro sobre crema' , exampleImage: '/tooltips/tipografiaPaleta-ej-grotesk-recta-en-rojonegro-.svg' },
      { value: 'Serif elegante; azul cobalto, blanco y dorado mate', label: 'Serif elegante', description: 'Azul cobalto, blanco y dorado mate', example: 'Ej. serif dorada sobre azul cobalto nocturno' , exampleImage: '/tooltips/tipografiaPaleta-ej-serif-dorada-sobre-azul-cob.svg' },
      { value: 'Tipografía Bold / Brutalista; blanco, negro y amarillo chicle', label: 'Bold Brutalista', description: 'Blanco, negro y amarillo chicle', example: 'Ej. letra negra maciza con fondo amarillo chicle' , exampleImage: '/tooltips/tipografiaPaleta-ej-letra-negra-maciza-con-fond.svg' },
      { value: 'La propia del estilo', label: 'La propia del estilo', description: 'Tipografía del movimiento elegido', example: 'Ej. tipografía fiel al movimiento elegido' , exampleImage: '/tooltips/tipografiaPaleta-ej-tipografía-fiel-al-movimien.svg' },
    ],
  },
  {
    id: 7,
    field: 'evita',
    title: 'Evita',
    subtitle: 'Exclusiones y filtros anti-tópicos',
    options: [],
  },
];
