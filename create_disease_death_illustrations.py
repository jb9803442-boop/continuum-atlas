from create_illustrations import *
assets.clear()

def heart():
 return path('M114 61C91 33 61 48 61 83Q60 123 135 171Q181 125 177 83C175 56 150 44 132 66V30H117Z',C,1.7,'url(#copper)')+path('M110 67L93 34L80 40L98 79M141 74L159 39L146 29L124 59',B,3,'url(#blue)')+path('M116 80Q129 119 135 160M124 103L81 88M130 125L160 99M127 131L98 124',M,1.5)

def liver():
 return path('M28 86Q41 43 101 48Q149 52 210 70Q196 96 159 105Q141 110 115 98Q87 134 45 143Q21 127 28 86Z',C,2,'url(#copper)')+path('M117 51Q117 79 107 107',C,2)

def shield():
 return path('M120 23L180 47V95Q169 145 120 178Q71 145 60 95V47Z',M,1.7,'url(#mint)')

s=shield()+path('M79 105H97L107 86L120 124L134 68L146 105H164',C,2.5)
for x,y in [(38,65),(204,71),(42,149),(199,146)]:s+=circle(x,y,6,'url(#copper)',C)+path(f'M{x} {y}L{70 if x<100 else 169} {y}',G,1)
add('death-causes',s,'A medical shield surrounded by risk signals represents multiple threats to life.',True)
s=''
for x,y,r in [(47,73,15),(98,96,24),(171,112,36)]:s+=circle(x,y,r,'none',M)+circle(x,y,r*.42,'url(#copper)',C)
s+=path('M31 152H65M82 152H124M149 163H203',G,1)+text(49,169,'CELL',G,7)+text(103,169,'TISSUE',G,7)+text(176,185,'ORGANISM',G,7)
add('death-levels',s,'Different biological scales are shown separately; death is not a mandatory linear sequence.',True)

s=group(heart(),'translate(-3 0) scale(.88)')+ellipse(177,118,29,43,'url(#copper)',C)+ellipse(177,118,19,35,'#162f2a',M)+path('M179 84Q152 104 171 151Q174 125 188 112Z',C,1.2,'url(#copper)')+path('M166 88Q177 117 180 147',B,1.6,extra='marker-end="url(#arrow)"')
add('Cardiovascular disease',s,'A heart and a narrowed artery illustrate one cardiovascular disease process.',True)
s=''
for x,y in [(45,57),(90,46),(137,47),(189,60),(40,102),(43,148),(88,158),(192,111),(186,157)]:s+=cell(x,y,16)
for x,y,r in [(104,84,16),(132,92,19),(93,114,19),(123,123,20),(151,120,17),(146,151,13)]:s+=circle(x,y,r,'url(#copper)',C)+circle(x+1,y-2,r*.4,'#573e3e',C)
s+=path('M88 181Q151 165 195 181',C,1.5)
add('Cancer',s,'An expanding cluster of abnormal cells disrupts a surrounding tissue layer.',True)
s=group(brain(),'translate(0 0) scale(.82)')+path('M153 119L169 104L184 117M177 133L188 145L208 133',C,2)+circle(154,119,6,'url(#copper)',C)+circle(208,133,6,'url(#copper)',C)+path('M172 122l4 6M179 131l4 5',G,1,extra='stroke-dasharray="2 3"')
s+=circle(185,171,4,'url(#copper)',C)+circle(198,171,3,'url(#copper)',C)+circle(190,180,3,'url(#copper)',C)
add('Neurodegenerative disease',s,'A brain and disrupted neural connections symbolize progressive neurodegenerative processes.',True)
s=path('M48 76Q22 98 45 128L91 158Q119 170 129 142Q136 125 117 111Z',M,2,'url(#mint)')+path('M54 103q9 -18 23 0t20 18',C,2)
for x,y in [(49,78),(73,93),(106,112),(45,129),(83,155),(119,149)]:s+=path(f'M{x} {y}l-8 8',M,1.4)
s+=circle(169,62,25,'url(#copper)',C)
for a in range(0,360,45):
 rad=math.radians(a);x=169+25*math.cos(rad);y=62+25*math.sin(rad);s+=path(f'M{x} {y}l{10*math.cos(rad)} {10*math.sin(rad)}',C,2)+circle(169+36*math.cos(rad),62+36*math.sin(rad),2,C,C)
s+=circle(161,54,4,'none',M)+circle(177,68,5,'none',M)+text(173,134,'HOST',G,7)+text(173,150,'RESPONSE',G,7)
add('Infection',s,'Stylized bacteria and a virus represent pathogens, alongside the role of host response.',True)
s=group(liver(),'translate(4 10) scale(.81)')+circle(164,135,34,'#132a24',M)+path('M140 149A27 27 0 1 1 189 150',G,3)+path('M164 135L145 148',C,3)+circle(164,135,4,'url(#copper)',C)+text(164,181,'FUNCTION',G,7)
add('Organ failure',s,'An organ and a reduced-function gauge symbolize inadequate function, not necessarily irreversible death.',True)
s=shield()+path('M107 71L141 105M141 71L107 105',C,5)+path('M88 140Q112 111 138 143L160 157',M,3)+path('M118 123L112 142L130 145',C,3)+path('M24 45L51 60M24 77L47 76M31 112L52 99',C,2)
add('Trauma',s,'An impact motif and interrupted structural support represent serious physical injury without graphic detail.',True)
s=helix(92,21,154,23)+circle(90,99,17,'none',C)+path('M112 99H147V74H181M147 99V146H181',G,1.5)+circle(193,74,14)+circle(193,146,14,'url(#copper)',C)+text(193,79,'G',M,12)+text(193,151,'A',C,12)
add('Genetic disease',s,'A highlighted DNA variant connects to different biological outcomes; effects depend on context.',True)
s=''
pts=[(70,50),(159,50),(192,121),(117,166),(45,116)]
for i,(x,y) in enumerate(pts):
 nx,ny=pts[(i+1)%len(pts)]
 if i!=2:s+=arrow(x+(nx-x)*.18,y+(ny-y)*.18,x+(nx-x)*.77,y+(ny-y)*.77)
 else:s+=path(f'M{x-14} {y+8}l-13 9M{nx+15} {ny-9}l13 -9',C,2)+path('M152 132l9 16M164 132l-9 16',C,2)
 s+=circle(x,y,10)
s+=path('M116 71L100 102H115L106 128L138 92H122Z',C,1.5,'url(#copper)')
add('Metabolic disease',s,'An interrupted biochemical cycle represents disruption in energy and substance processing.',True)
s=path('M30 45V163H212',G,1)+path('M40 67Q96 63 130 96T203 134',M,2.5)+path('M42 143Q109 146 150 158T203 166',C,2)
for x,y,h in [(66,75,65),(112,88,54),(163,115,33),(197,131,21)]:s+=path(f'M{x} {y}v{h}',G,1,extra='stroke-dasharray="2 4"')
s+=text(126,30,'PHYSIOLOGICAL RESERVE',G,7)+text(132,187,'AGE',G,7)
add('Aging-related decline',s,'A schematic narrowing margin of physiological reserve illustrates vulnerability, not an individual prediction.',True)
s=cell(55,95,31)+arrow(92,95,116,95)+circle(153,81,17,'url(#mint)',M)+circle(176,119,13,'url(#mint)',M)+circle(140,125,10,'url(#mint)',M)
for x,y in [(151,79),(175,118),(139,123)]:s+=circle(x,y,4,'url(#copper)',C)
s+=circle(196,77,7)+circle(196,146,6)+text(119,182,'APOPTOSIS · ONE EXAMPLE',G,7)
add('Cellular death',s,'A cell separates into membrane-bound fragments during apoptosis, one form of cell death.',True)
s=''
for row in range(4):
 for col in range(5):
  x=43+col*38;y=44+row*35;dead=(row in [1,2] and col in [1,2,3])
  s+=ellipse(x,y,16,14,'#292e2b' if dead else 'url(#mint)',C if dead else M)
  if dead:s+=path(f'M{x-7} {y-5}l5 4l-4 6M{x+4} {y-7}l3 8',C,1.4)
  else:s+=circle(x,y,4,'url(#copper)',C)
s+=path('M68 65H173V134H68Z',C,1,extra='stroke-dasharray="3 5"')
add('Tissue death',s,'A region of nonviable cells is shown within a larger field of living tissue.',True)
s=group(liver(),'translate(0 0) scale(.95)')+path('M59 84L91 67L116 86L143 67M74 111L94 85L115 108L141 90L169 96',G,1)+path('M38 155H202',C,1.5)+path('M56 166v9M184 166v9',G,1)+text(120,181,'VIABILITY ≠ FUNCTION ALONE',G,7)
add('Organ death',s,'A muted organ represents loss of viability; organ failure alone does not establish organ death.',True)
s=group(brain(),'translate(9 -4) scale(.91)')+path('M105 148L120 173L128 171L116 149',C,2,'url(#copper)')+path('M45 38H29V166H56M185 38H207V166H180',C,1.4)+text(120,191,'FORMAL CLINICAL DETERMINATION',G,6.5)
add('Brain death',s,'The brain and brainstem are framed together; this illustration is not a diagnostic test.',True)
s='';pts=[(120,35),(184,74),(167,150),(77,150),(54,74)]
for i,(x,y) in enumerate(pts):
 nx,ny=pts[(i+1)%5]
 s+=path(f'M{x+(nx-x)*.18} {y+(ny-y)*.18}L{x+(nx-x)*.42} {y+(ny-y)*.42}M{x+(nx-x)*.6} {y+(ny-y)*.6}L{x+(nx-x)*.82} {y+(ny-y)*.82}',G,1.5)
 s+=circle(x,y,13,'url(#mint)',M)
s+=circle(120,99,28,'none',C,extra='stroke-dasharray="3 6"')+path('M106 99h28M120 85v28',C,1.5)+text(120,187,'COORDINATION ACROSS SYSTEMS',G,7)
add('Loss of integrated biological function',s,'Disconnected organ-system nodes symbolize lost integration, not a stand-alone clinical definition of death.',True)
branch={k:v for k,v in assets.items() if k in ['death-causes','death-levels']}
topics={k:v for k,v in assets.items() if k not in branch}
Path('public/disease-death-visuals.js').write_text('// Replace individual sources without changing atlas navigation.\nwindow.DISEASE_DEATH_BRANCH_VISUALS='+json.dumps(branch,indent=2)+';\nObject.assign(window.TOPIC_VISUALS,'+json.dumps(topics,indent=2)+');\n')
print('Created',len(topics),'Disease & Death topic illustrations and',len(branch),'branch illustrations.')
