from pathlib import Path
import math,json,re
out=Path('public/illustrations');out.mkdir(parents=True,exist_ok=True)
M='#afe3cb';C='#d3ac96';B='#8db5cf';G='#719a88'
def path(d,stroke=M,width=2,fill='none',extra=''):
 return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'
def circle(x,y,r,fill='url(#mint)',stroke=M,extra=''):
 return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="1.2" {extra}/>'
def ellipse(x,y,rx,ry,fill='url(#mint)',stroke=M,extra=''):
 return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="1.2" {extra}/>'
def text(x,y,t,color=G,size=8):
 return f'<text x="{x}" y="{y}" fill="{color}" text-anchor="middle" font-family="Arial,sans-serif" font-size="{size}" letter-spacing="1">{t}</text>'
def arrow(x,y,x2,y2,color=M):
 return path(f'M{x} {y}L{x2} {y2}',color,1.5,extra='marker-end="url(#arrow)"')
def group(s,transform):return f'<g transform="{transform}">{s}</g>'
def helix(x=120,y=18,h=160,w=26,mutation=False):
 a=[];b=[];s=''
 for i in range(41):
  yy=y+i*h/40;xx=x+math.sin(i*math.pi/10)*w;xx2=2*x-xx;a.append(f'{xx:.2f},{yy:.2f}');b.append(f'{xx2:.2f},{yy:.2f}')
  if i%2==0:s+=path(f'M{xx} {yy}L{x} {yy}',C if mutation and i==20 else M,3)+path(f'M{x} {yy}L{xx2} {yy}',C if mutation and i==20 else B,3)
 s+=f'<polyline points="{" ".join(a)}" fill="none" stroke="{M}" stroke-width="3"/><polyline points="{" ".join(b)}" fill="none" stroke="{B}" stroke-width="3"/>'
 return s
brainshape='M116 35C96 22 78 35 74 46C54 39 43 54 43 69C25 80 29 102 39 110C29 132 46 148 61 145C69 165 93 165 106 154C114 160 127 157 130 147C148 151 163 138 163 122C184 119 190 98 179 85C188 63 170 50 156 51C147 30 130 27 116 35Z'
def brain():
 s=path(brainshape,M,1.6,'url(#mint)')
 for d in ['M75 46Q88 49 82 62T61 79Q49 84 56 98','M112 38Q95 52 110 65T101 89Q80 87 79 105','M43 70Q64 63 64 79','M40 111Q60 105 65 116T87 131Q99 142 86 153','M107 154Q95 134 116 124T123 102Q108 88 127 80','M156 52Q140 49 138 67T156 86Q177 92 162 109','M163 123Q140 114 139 137','M114 46Q126 52 123 66','M61 145Q49 128 62 125']:
  s+=path(d,'#b4d1bb',1.8)
 return s+path('M128 149Q136 162 149 177L134 180L115 156',M,1.5,'url(#mint)')
def cell(x,y,r=25):return circle(x,y,r)+circle(x+2,y-2,r*.36,'url(#copper)',C)+ellipse(x-r*.48,y+r*.24,r*.15,r*.09,'#82ab91')
def network(points,edges):
 s=''
 for i,j in edges:s+=path(f'M{points[i][0]} {points[i][1]}L{points[j][0]} {points[j][1]}','#6d9d92',1.1)
 for x,y in points:s+=circle(x,y,5)
 return s
assets={}
def add(name,body,caption,symbolic=False):
 slug=re.sub('[^a-z0-9]+','-',name.lower()).strip('-')
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 200" role="img" aria-labelledby="title desc"><title id="title">{name}</title><desc id="desc">{caption}</desc><defs><radialGradient id="mint" cx="35%" cy="30%" r="85%"><stop stop-color="#91bca4" stop-opacity=".75"/><stop offset=".5" stop-color="#335d4f" stop-opacity=".8"/><stop offset="1" stop-color="#142b28"/></radialGradient><radialGradient id="copper" cx="30%" cy="25%" r="90%"><stop stop-color="#d0ad94"/><stop offset=".55" stop-color="#7e6257"/><stop offset="1" stop-color="#332f30"/></radialGradient><linearGradient id="blue"><stop stop-color="#9abdc9"/><stop offset="1" stop-color="#294852"/></linearGradient><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#afe3cb"/></marker></defs><g fill="none" stroke="#7ca594" opacity=".14"><circle cx="120" cy="100" r="83"/><circle cx="120" cy="100" r="68" stroke-dasharray="2 5"/><path d="M20 100H220M120 8V192" stroke-dasharray="2 6"/></g>{body}</svg>'''
 (out/f'{slug}.svg').write_text(svg)
 assets[name]={'src':f'./illustrations/{slug}.svg','alt':caption,'caption':caption,'kind':'Conceptual illustration' if symbolic else 'Simplified scientific illustration'}
add('DNA',helix()+text(178,75,'A — T',C)+text(63,139,'C — G',B),'Two complementary strands form the DNA double helix.')
s='';pts=[]
for i in range(61):
 y=20+i*2.5;x=114+math.sin(i/8)*28;pts.append(f'{x},{y}')
 if i%4==0:s+=path(f'M{x} {y}l20 0',C if i%8 else M,3)+circle(x+22,y,2,C if i%8 else M,'none')
s+=f'<polyline points="{" ".join(pts)}" fill="none" stroke="{M}" stroke-width="4"/>'
add('RNA',s+text(185,66,'A U',C)+text(61,138,'C G',B),'A single RNA strand with projecting nucleotide bases.')
s=''
for d,color in [('M53 115C10 38 138 5 175 57S201 169 129 156S27 108 59 70S166 67 156 122S74 150 89 96S147 97 124 120',M),('M51 106C76 166 176 166 180 102S112 21 93 52S152 94 134 139',C)]:
 s+=path(d,'#142724',12)+path(d,color,7)
for i in range(7):s+=path(f'M{70+i*7} {48+i*3}q-10 22 6 31',B,2)
add('Proteins',s,'A folded protein ribbon showing loops and helical segments.')
s=''
for i in range(12):
 x=25+i*17;y=65+math.sin(i/2)*5
 s+=circle(x,y,6)+circle(x,y+64,6)+path(f'M{x-2} {y+7}l-3 20l4 5M{x+2} {y+7}l3 20l-2 5M{x-2} {y+57}l-3 -20l4 -5M{x+2} {y+57}l3 -20l-2 -5',M,1)
s+=path('M101 64Q112 55 115 69V121Q113 139 102 128ZM128 66Q137 56 140 68V123Q136 137 128 129Z',C,1.4,'url(#copper)')+arrow(121,32,121,155)+text(120,181,'LIPID BILAYER')
add('Cell membrane',s,'A phospholipid bilayer with a membrane transport channel.')
s=ellipse(120,99,85,48,'url(#copper)',C)+ellipse(120,99,75,39,'#213d32',M)
s+=path('M52 91Q63 62 73 75L82 115Q85 130 92 119L96 75Q101 64 107 80L115 122Q120 134 125 119L130 77Q134 66 140 78L149 115Q155 129 160 111L162 87Q166 70 180 91',M,3)+text(120,170,'INNER MEMBRANE · CRISTAE')
add('Mitochondria',s,'A cutaway mitochondrion reveals the folded inner membrane, or cristae.')
s=circle(120,98,68)+circle(120,98,61,'none','#759f8b')
for a in range(0,360,45):
 x=120+64*math.cos(math.radians(a));y=98+64*math.sin(math.radians(a));s+=circle(x,y,4,'#0d1c1b',C)
s+=path('M83 62Q57 96 93 100T144 64Q169 39 170 86T133 136Q80 165 82 121T132 75Q154 84 151 124',M,2)+circle(114,104,22,'url(#copper)',C)+circle(108,99,8,'#c6a589',C)
add('Nucleus',s,'A nuclear envelope encloses chromatin and a prominent nucleolus.')
s=cell(120,48,27)+arrow(103,77,57,115)+arrow(120,79,120,117)+arrow(139,77,183,114)+cell(49,145,23)+ellipse(120,145,14,26)+path('M116 125v40M124 125v40',C)+circle(190,145,22)+path('M190 132v26M177 145h26M181 136l18 18M181 154l18 -18',C,2)
add('Stem cells',s,'A stem cell branches toward several specialized cell types.',True)
s=path('M73 65Q78 34 109 40Q140 31 157 60L146 80L170 92Q167 129 145 145Q114 169 82 142Q52 131 55 95Z',M,2,'url(#mint)')+path('M90 77Q113 53 129 75Q143 92 123 97Q103 91 101 114Q79 120 76 100Z',C,2,'url(#copper)')
for x,y in [(177,57),(190,118),(53,48)]:
 s+=circle(x,y,8,'url(#copper)',C)
 for a in range(0,360,60):s+=path(f'M{x+8*math.cos(a)} {y+8*math.sin(a)}l{5*math.cos(a)} {5*math.sin(a)}',C)
add('Immune cells',s,'An immune cell with a lobed nucleus approaches foreign particles.')
add('Brain',brain(),'A simplified brain surface with cortical folds and brainstem.')
s=path('M115 66C91 33 59 55 63 88C64 124 105 152 137 176C145 144 182 119 177 83C174 60 154 53 137 68L137 31L121 28Z',C,2,'url(#copper)')+path('M110 66L91 35L77 40L96 78M141 73L157 37L145 28L123 57',B,3,'url(#blue)')+path('M116 77Q128 119 137 167M124 102L83 84M130 127L166 96M130 131L95 122M144 107L156 83',M,2)+path('M76 87Q74 111 98 134','#e5c4af',1.4)
add('Heart',s,'An anatomical heart with major vessels and branching coronary arteries.')
s=path('M28 86Q41 43 101 48Q149 52 210 70Q196 96 159 105Q141 110 115 98Q87 134 45 143Q21 127 28 86Z',C,2,'url(#copper)')+path('M117 51Q117 79 107 107',C,2)+path('M42 89Q74 76 106 79M107 79L159 83L187 73M105 80L87 109',M,2)+ellipse(129,109,10,19,'url(#mint)',M)+path('M127 98L112 83',M,3)
add('Liver',s,'The liver’s lobes, branching vessels, and adjacent gallbladder.')
s=''
for flip in [False,True]:
 k=path('M72 46C37 35 27 66 30 99C34 133 60 151 80 128C94 112 79 107 70 96C60 82 96 68 72 46Z',C,2,'url(#copper)')+path('M64 60Q43 59 44 88T65 123M66 85L50 73M66 92L48 99M68 106L58 119',M,1.2)+path('M76 83Q104 88 96 123L96 167',B,2)
 s+=group(k,'translate(240 0) scale(-1 1)') if flip else k
s+=path('M115 24V94M125 24V94M115 66L79 77M125 66L162 78',C,3)+ellipse(120,170,18,12)
add('Kidneys',s,'Paired kidneys with vessels and ureters descending toward the bladder.')
s=path('M105 47Q88 26 71 49Q42 68 36 133Q33 159 55 158Q83 153 103 137Z',C,1.5,'url(#copper)')+path('M137 47Q158 27 176 55Q196 86 205 138Q208 162 185 158L148 144L145 107L131 97Z',C,1.5,'url(#copper)')+path('M120 18V78L91 96M120 78L157 96',M,7)
for d in ['M91 96L67 68M91 96L65 114L52 141M91 96L87 135','M157 96L173 73M157 96L178 121L190 140M157 96L154 132','M66 113L53 105M176 120L184 103']:s+=path(d,M,2)
for y in range(25,66,7):s+=path(f'M115 {y}h10',C,1.5)
add('Lungs',s,'Two lungs surrounding a trachea that branches into the bronchial tree.')
s=path('M26 62L177 38L214 70L65 97Z',C,1.5,'url(#copper)')+path('M26 62L65 97L214 70V98L65 126L26 90Z',C,1.5,'#775b50')+path('M26 90L65 126L214 98V131L65 160L26 127Z',M,1.5,'#46594b')+path('M26 127L65 160L214 131V153L65 181L26 148Z',C,1.5,'#9c8965')
s+=path('M112 133Q100 103 107 73L97 36',C,4)+path('M150 117q-17 6 -4 13t-3 13t-5 14M147 119V85',M,2)+path('M71 154L128 139L178 131M124 140L110 120M160 134L173 108',B,2)
add('Skin',s,'A skin cross-section shows layered tissue, a hair follicle, glands, and vessels.')
s=path('M95 89Q112 71 133 88L128 121L119 150L113 123Z',C,2,'url(#copper)')+path('M96 93Q71 67 50 85Q40 96 55 101M132 94Q156 67 181 85Q193 98 175 103',M,4)+ellipse(59,109,13,9,'url(#copper)',C)+ellipse(174,110,13,9,'url(#copper)',C)+path('M117 149V173',C,4)
s+=text(119,31,'FEMALE ANATOMY',G,7)
add('Reproductive system',s,'A representative female reproductive anatomy: uterus, uterine tubes, and ovaries.')
s=path('M70 82L46 52L27 43M46 52L47 26M70 82L29 84L18 69M29 84L18 106M70 82L52 124L29 140M52 124L61 151M70 82L94 52L117 35M94 52L88 24',M,2)+path('M66 66L77 72L86 65L87 82L102 94L81 96L75 109L64 98L47 99L53 85L51 70Z',M,1.5,'url(#mint)')+circle(72,84,7,'url(#copper)',C)+path('M91 93Q123 106 141 115T192 137L218 125M192 137L212 156M192 137L199 175',M,2)
for x,y in [(112,103),(137,114),(161,125)]:s+=ellipse(x,y,13,6,'url(#blue)',B,extra=f'transform="rotate(24 {x} {y})"')
add('Neurons',s,'A neuron with branching dendrites, a cell body, and a myelinated axon.')
s=path('M86 18V48Q49 59 51 95Q80 119 159 103Q193 63 148 47V18',M,2,'url(#mint)')+path('M49 150Q117 117 186 148V183H49Z',B,2,'url(#blue)')
for x,y in [(90,69),(120,60),(143,84),(80,90),(116,88)]:s+=circle(x,y,7,'none',C)+circle(x,y,2,C,C)
for x,y in [(85,117),(108,125),(127,115),(141,125)]:s+=circle(x,y,2,C,C)
for x in [76,106,137,167]:s+=path(f'M{x} 143v12h8v-12',M,2)
add('Synapses',s,'Neurotransmitter vesicles release signals across the gap between two neurons.')
pts=[(35,47),(35,101),(35,155),(95,32),(95,81),(95,128),(95,176),(155,52),(155,101),(155,151),(211,77),(211,128)]
edges=[(a,b) for a in range(3) for b in range(3,7)]+[(a,b) for a in range(3,7) for b in range(7,10)]+[(a,b) for a in range(7,10) for b in range(10,12)]
add('Neural networks',network(pts,edges),'A schematic of interconnected neurons exchanging signals.',True)
s=group(brain(),'translate(0 2) scale(.82)')+path('M97 95Q115 72 126 97T98 123Q81 112 97 95',C,4)+path('M155 123A32 32 0 1 1 159 158',M,2,extra='marker-end="url(#arrow)"')+text(185,145,'↺',C,20)
add('Memory',s,'A brain circuit highlighted alongside a recurring loop, symbolizing memory.',True)
s=network([(37,137),(75,85),(125,127),(171,67),(208,101)],[(0,1),(1,2),(2,3),(3,4)])+path('M37 137Q80 56 125 127T208 101',C,4)+arrow(49,166,192,35)+text(120,186,'EXPERIENCE → PLASTICITY',G,7)
add('Learning',s,'Strengthening connections and a rising pathway symbolize learning and neural plasticity.',True)
s=path('M89 176V147Q66 136 69 114L57 107L70 88Q64 48 99 32Q135 17 155 46Q171 68 161 99L150 131V176',M,2,'url(#mint)')
for x,y,r,c in [(104,62,15,M),(134,63,15,C),(91,89,14,B),(118,92,14,M),(142,92,11,B),(116,118,12,C)]:s+=circle(x,y,r,'none',c)
add('Personality',s,'An overlapping mosaic within a human profile represents interacting personality traits.',True)
s=path('M83 177V145Q67 133 71 115L59 109L71 89Q65 52 95 35Q133 16 155 47Q176 75 154 127V177',M,1.8,'url(#mint)')+ellipse(121,76,32,17,'none',C)+circle(121,76,11)+circle(121,76,4,'#d8e9ce',M)
for r in [42,52,62]:s+=path(f'M{121-r} 72A{r} {r*.65} 0 0 1 {121+r} 72',M,.9)
add('Consciousness',s,'An eye and expanding waves inside a profile symbolize subjective awareness, not an established mechanism.',True)
s=helix(87,21,150,24)+path('M54 74H120V116H54Z',C,1,'#c9a88320')+path('M123 75h12v40h-12',C,2)+text(173,99,'GENE',C,9)+path('M135 96h15',C)
add('Genes',s,'A highlighted segment of a DNA molecule represents a gene.')
s=helix(101,20,156,25,True)+circle(107,99,20,'none',C)+path('M126 96h29',C,1.5)+text(183,99,'A → G',C,10)
add('Mutations',s,'A highlighted base substitution illustrates a change in DNA sequence.')
s=group(helix(52,25,95,16),'translate(0 5)')+arrow(77,90,102,90)
for i in range(7):s+=circle(114+i*4,67+i*8,3,'url(#mint)',M)+path(f'M{114+i*4} {67+i*8}l9 -3',C,1)
s+=arrow(151,100,173,100)+path('M184 73C154 91 220 96 190 116S221 149 215 115S181 106 207 77',C,4)+text(52,159,'DNA')+text(124,159,'RNA')+text(196,159,'PROTEIN')
add('Gene expression',s,'DNA information is transcribed into RNA and translated into a protein.')
s=path('M20 113Q47 57 67 94T112 103T155 92T219 108',M,3)
for x,y in [(62,103),(117,97),(170,104)]:
 s+=ellipse(x,y,17,24,'url(#copper)',C)+path(f'M{x-22} {y-8}Q{x} {y-36} {x+22} {y-4}M{x-22} {y+3}Q{x} {y-25} {x+22} {y+7}',M,2)+path(f'M{x+3} {y-23}l7 -20',C,1)+circle(x+11,y-46,5,'#d9c7a1',C)
s+=text(120,163,'DNA · HISTONES · CHEMICAL TAGS',G,7)
add('Epigenetics',s,'DNA wraps around histone proteins bearing regulatory chemical marks.')
s=circle(69,47,24)+circle(172,47,24,'url(#copper)',C)+path('M93 47h55M120 47v49M62 98h116M62 98v34M120 98v34M178 98v34',M,1.5)
for x in [62,120,178]:s+=circle(x,153,21)+path(f'M{x-6} 143l12 20M{x+6} 143l-12 20',C,3)
s+=path('M63 37l12 20M75 37L63 57M166 37l12 20M178 37l-12 20',C,3)
add('Heredity',s,'A family-tree diagram represents genetic information passing between generations.',True)
s=path('M107 39A13 13 0 0 1 133 39V127A27 27 0 1 1 107 127Z',M,2,'url(#mint)')+path('M120 67V145',C,7)+circle(120,149,17,'url(#copper)',C)
for y in range(42,120,13):s+=path(f'M137 {y}h10',M,1)
s+=text(172,86,'37°C',C,12)+path('M67 60v30M55 75h24M59 64l16 22M59 86l16 -22',B,1.4)
add('Temperature',s,'A thermometer depicts regulation around a typical core temperature; normal temperature varies.')
s=ellipse(63,83,29,42)+circle(59,82,12,'url(#copper)',C)+arrow(98,83,155,83)+path('M181 32Q159 93 182 166',M,4)+path('M171 66h-9v28h11',C,4)
for x,y in [(99,62),(117,100),(140,65)]:s+=circle(x,y,5,'url(#copper)',C)
s+=text(62,154,'GLAND',G,8)+text(193,183,'RECEPTOR',G,8)
add('Hormones',s,'Hormone molecules travel from a secreting gland toward a target-cell receptor.')
s='';coords=[(120,37),(175,68),(175,132),(120,164),(65,132),(65,68)]
for i,(x,y) in enumerate(coords):
 nx,ny=coords[(i+1)%6];s+=arrow(x+(nx-x)*.2,y+(ny-y)*.2,x+(nx-x)*.8,y+(ny-y)*.8)
 s+=circle(x,y,9,'url(#mint)',M)
s+=path('M125 66L103 102H119L109 135L140 93H124Z',C,1.5,'url(#copper)')+text(189,169,'ATP',C,9)
add('Metabolism',s,'A reaction cycle and ATP energy motif represent metabolic transformations.',True)
s=path('M119 27L175 48V93Q173 133 120 172Q67 133 65 93V48Z',M,2,'url(#mint)')+path('M120 65V132M86 85h68M95 85L79 114h32L95 85M147 85L131 114h32L147 85',C,1.5)+circle(120,66,5)+path('M104 134h32',C,2)
add('Immune regulation',s,'A balanced scale within a shield symbolizes controlled immune defense.',True)
s=helix(108,21,154,27)+path('M72 87h70v24H72Z','#13211f',1,'#13211f')+path('M87 86v26M132 86v26',C,3,extra='stroke-dasharray="3 4"')+path('M141 63L166 87L151 106L175 131L191 116L166 91L182 77L160 55L162 72Z',C,1.5,'url(#copper)')+arrow(62,100,81,100)
add('Cellular repair',s,'A repair-tool motif at a DNA break symbolizes molecular maintenance and repair.',True)
Path('public/topic-visuals.js').write_text('// Separate illustration registry. Replace src to supply your own images.\nwindow.TOPIC_VISUALS='+json.dumps(assets,indent=2)+';\n')
print(f'Created {len(assets)} distinct topic illustrations.')
