from pathlib import Path
import subprocess, json, html
# Reuse the established visual language without regenerating other pathways.
exec(Path('create_illustrations.py').read_text().split("add('DNA'")[0])
raw=subprocess.check_output(['node','--input-type=module','-e',"globalThis.window=globalThis;globalThis.ATLAS=[];globalThis.ATLAS_DOMAINS=[];globalThis.ATLAS_PATHWAYS=[{},{},{}];await import('./public/futurist-data.js');console.log(JSON.stringify(FUTURIST_BRANCHES));"],text=True)
branches=json.loads(raw);registry={}
L='#b4c7ed'
def box(x,y,w,h,c=L):return path(f'M{x} {y}h{w}v{h}h-{w}Z',c,1.5,'#1a2933')
def cross(x,y,r=9):return path(f'M{x-r} {y}h{2*r}M{x} {y-r}v{2*r}',M,2.5)
def person(mech=0):
 s=circle(120,35,13)+path('M120 49V117M116 62L90 95L82 127M124 62L151 96L157 127M120 117L97 169M120 117L143 169',M,5)
 if mech>=1:s+=path('M124 62L151 96L157 127',L,7)+circle(151,96,6,'#1b2836',L)
 if mech>=2:s+=box(107,60,26,52)+path('M116 119L94 169M124 119L146 169',L,7)+circle(106,143,5,'#1b2836',L)+circle(135,143,5,'#1b2836',L)
 if mech>=3:s+=box(108,23,24,25)+path('M108 63L86 97L80 127',L,7)
 return s

def put(b,i,s,caption):
 t=b['items'][i];key=t['key'];slug=b['id']+'-'+re.sub('[^a-z0-9]+','-',t['name'].lower()).strip('-')
 add(slug,s,caption,True);v=assets[slug];registry[key]=v
 p=out/(slug+'.svg');svg=p.read_text().replace('<title id="title">'+slug+'</title>','<title id="title">'+html.escape(t['name'])+'</title>');p.write_text(svg)

def batch(id,arr):
 b=next(b for b in branches if b['id']==id)
 assert len(arr)==len(b['items']),(id,len(arr))
 for i,(s,c) in enumerate(arr):put(b,i,s,c)

batch('fut-human-machine',[
 (path('M73 31L97 67L126 94',M,12)+circle(127,97,11,'#25323c',L)+path('M133 103L160 140',L,12)+path('M155 146l14 12M161 140l18 9M164 133l19 4',L,3)+path('M102 71l17 19',C,3),'A biological upper arm meets an articulated prosthetic forearm and hand.'),
 (path('M76 39V70M160 41V68M77 135v32M162 134v31',M,5)+box(63,68,114,65)+circle(119,100,24,'url(#blue)',L)+path('M119 78v44M97 100h44M103 84l32 32',L,2)+arrow(36,100,57,100)+arrow(183,100,207,100),'An engineered pump between biological conduits represents support of a selected organ function.'),
 (group(brain(),'translate(28 7) scale(.78)')+box(147,46,39,24)+path('M148 58L130 74L117 83M149 65L135 95L121 103',L,2)+circle(116,83,3,C,C)+circle(120,103,3,C,C),'An implanted electrode array interfaces with a simplified neural structure.'),
 (group(brain(),'translate(-2 35) scale(.53)')+path('M102 82h17l5-14l8 31l8-19h15',L,2)+box(161,59,57,54)+path('M185 115v15M170 133h39M178 83l21 15l-17 3Z',M,1.5),'Selected brain signals are translated into commands for an external screen.'),
 (person()+path('M101 59L83 94L77 126M139 59L158 94L164 126M105 116L84 173M134 116L158 173',L,4)+circle(89,144,6,'#26343a',L)+circle(149,144,6,'#26343a',L),'A support frame lies outside a biological body, emphasizing wearable movement assistance.'),
 (path('M29 99Q57 55 88 99Q58 132 29 99Z',M,2)+circle(59,97,12)+arrow(97,98,124,98)+box(131,77,26,42)+arrow(164,98,187,98)+path('M205 63Q230 83 208 105Q191 108 201 125M205 77Q216 85 204 95',L,3),'An input sensor and converter route information to another sensory pathway; substitution is not identical natural sensation.'),
 (group(brain(),'translate(22 3) scale(.83)')+circle(185,51,15,'url(#blue)',L)+cross(185,51)+path('M162 62L145 77M173 109L195 128M193 119v19M184 129h20',L,2)+text(119,185,'TASK / CAPACITY / TRADE-OFF',G,7),'A brain with external support symbols distinguishes assisted tasks from a claim of general cognitive enhancement.'),
 (box(45,40,151,104)+path('M76 144l-10 21l37-21',L,1.5)+path('M75 71h59M75 86h91M75 102h72',M,2)+circle(177,128,23,'url(#blue)',L)+path('M165 129l8 7l15-18',L,2),'A dialogue interface with a verification mark emphasizes an assistant whose output still needs review.'),
 (person(2)+circle(120,88,67,'none',L,extra='stroke-dasharray="3 6"')+path('M49 87H29M191 87h21',L,2)+circle(29,87,5)+circle(211,87,5),'A conceptual integrated body is surrounded by a control loop; the whole-body capability is speculative.')
])
batch('fut-cybernetic',[
 (person()+group(cell(45,86,18),'translate(0 0)')+path('M62 86L105 82',G,1),'A living figure linked to a cell represents primarily biological organization.'),
 (person(1)+path('M167 81h28M181 67v28',L,2)+text(120,193,'CONTINUITY / SELECTED SUPPORT',G,6.5),'One engineered arm is integrated into an otherwise biological figure.'),
 (person(2)+ellipse(120,35,25,20,'none',M)+path('M91 35H56',M,1)+text(46,30,'BIO',G,7)+text(120,192,'HYPOTHETICAL INTEGRATION',G,7),'Extensive engineered support surrounds a remaining biological head; this is a hypothetical configuration.'),
 (person(3)+box(31,70,31,37)+path('M63 87h25M40 80h13v16H40Z',L,2)+text(120,192,'SUBSTRATE ≠ IDENTITY',G,7),'An entirely schematic body and processor mark a speculative artificial substrate, not proven personal continuity.')
])
batch('fut-digital',[
 (box(46,42,113,111)+box(60,29,113,111)+box(76,56,43,37)+circle(105,67,5)+path('M79 89l11-15l12 11l10-7M77 110h75M77 120h49',M,1.7),'Layered archive cards hold images and records, not a continuing subject of experience.'),
 (circle(120,81,36,'url(#blue)',L)+path('M91 140Q120 111 149 140',M,3)+network([(55,58),(177,44),(190,114),(55,134),(119,174)],[(0,1),(1,2),(2,4),(4,3)])+text(120,87,'STYLE',L,9),'A modeled profile is connected to trait-like points, emphasizing a partial representation of personality.'),
 (''.join(path(f'M{35+i*8} {100-h}v{h*2}',L if i%3 else M,3) for i,h in enumerate([8,15,27,42,31,16,7,23,51,37,18,7,14,29,38,22,10,6,20,31,17,8]))+text(120,174,'SYNTHETIC VOICE / DISCLOSE',G,7),'A distinctive synthesized waveform represents reconstructed sound, not the presence or endorsement of the speaker.'),
 (box(62,25,116,145)+ellipse(120,77,28,36,'none',L)+path('M82 149Q120 98 158 149M108 75h3M133 75h3M111 95q10 6 20 0',M,2)+path('M61 58h117M61 101h117M99 25v145M140 25v145',G,.6),'A gridded face and shoulders represent a reconstructed visual likeness.'),
 (path('M39 147V49M39 147H207',G,1.3)+path('M44 126L75 112L102 119L132 84L160 65L194 74',M,2)+path('M43 131Q89 125 125 96T204 51',L,1.5,extra='stroke-dasharray="3 4"')+''.join(circle(x,y,4) for x,y in [(75,112),(102,119),(132,84),(160,65),(194,74)])+text(120,181,'OBSERVATION / PREDICTION',G,7),'Observed behavior points and a dashed predictive curve remain distinct.'),
 (box(36,32,76,104)+circle(74,62,16)+path('M50 113Q73 80 98 113',M,2)+arrow(119,86,145,86)+box(153,61,57,61)+path('M164 122l-6 14l22-14M165 78h32M165 90h24M165 102h29',L,1.5)+text(120,176,'REPRESENTATION ≠ SURVIVAL',G,7),'A personal record feeds a conversation generator; the result is a representation, not demonstrated survival.'),
 (box(30,34,181,134)+network([(60,67),(101,59),(149,74),(184,60),(73,111),(121,132),(170,117)],[(0,1),(1,2),(2,3),(0,4),(1,4),(4,5),(2,5),(2,6),(5,6)])+path('M45 153h30l6-12l10 18l9-14h91',L,1.3),'A circuit simulation shows modeled nodes and output activity without claiming a whole person has been reproduced.'),
 (group(brain(),'translate(-1 26) scale(.55)')+path('M111 57v87',L,1.5,extra='stroke-dasharray="3 4"')+arrow(116,96,144,96)+box(156,43,49,106)+box(167,54,27,22)+box(167,87,27,22)+box(167,120,27,18)+text(121,178,'SCAN / MODEL / VALIDATE / ?',G,7),'A brain, scanning boundary, and computing stack show unresolved stages of the whole-brain emulation proposal.')
])
batch('fut-medicine',[
 (path('M120 28L173 49V102Q166 140 120 165Q74 140 67 102V49Z',L,2,'url(#blue)')+cross(120,91,24)+text(120,189,'REDUCE AVOIDABLE HARM',G,7),'A protective shield and care symbol represent prevention rather than guaranteed indefinite life.'),
 (circle(119,75,22)+path('M82 128Q119 90 156 128',M,3)+''.join(box(x,y,26,25) for x,y in [(35,41),(180,41),(35,134),(180,134)])+path('M61 54L94 68M180 54L145 68M61 147L91 127M180 147L148 127',L,1.5),'An individual is connected to different kinds of information that may inform care.'),
 (circle(106,84,44,'none',L)+path('M137 119L177 162',L,9)+circle(105,84,17)+cross(105,84,7)+path('M46 174H196',G,1)+circle(75,174,4)+text(120,193,'DETECTION ≠ BETTER OUTCOME',G,6.5),'A magnifying lens finds a signal while a timeline reminds us that earlier detection is not automatically beneficial.'),
 (''.join(circle(x,y,5) for x,y in [(41,58),(57,58),(73,58),(41,75),(57,75),(73,75)])+arrow(85,67,112,67)+box(123,47,77,41)+path('M142 57v20M155 57v20M168 57v20M181 57v20',L,2)+arrow(157,96,157,117)+box(123,127,77,31)+cross(161,142,8),'A subgroup is linked to a marker-guided care strategy rather than a uniquely designed cure for every person.')
])
batch('fut-genetics',[
 (circle(56,94,24,'url(#blue)',L)+helix(55,79,31,8)+arrow(84,95,113,95)+cell(161,98,41)+path('M145 98q17-20 30 1',L,3),'A genetic payload and target cell symbolize gene delivery, with effectiveness and safety left to evidence.'),
 (helix(115,25,144,29)+path('M155 78l36-25M156 84l35 25',L,3)+circle(195,50,7,'none',L)+circle(195,112,7,'none',L)+path('M89 94h50',C,4),'Editing tools meet a DNA region; the cut is a simplification, not a guarantee of error-free correction.'),
 (path('M31 104Q56 60 80 99T129 101T185 99T212 83',M,5)+circle(77,91,17,'url(#blue)',L)+circle(131,103,17,'url(#blue)',L)+circle(185,92,17,'url(#blue)',L)+path('M78 72v-19M132 84V59M186 73V48',C,2)+circle(78,50,5,C,C)+circle(132,56,5,C,C)+circle(186,45,5,C,C),'DNA packaging and attached regulatory marks represent epigenetic regulation rather than a rewritten DNA sequence.'),
 (helix(63,34,123,20,True)+arrow(93,96,138,96)+helix(171,34,123,20)+box(145,85,51,22,M)+text(120,186,'SPECIFIC VARIANT / SPECIFIC CLAIM',G,6.2),'A highlighted DNA change is contrasted with a proposed correction; whole-person and disease outcomes require separate evidence.')
])
batch('fut-cellular',[
 (cell(119,46,22)+arrow(110,74,66,119)+arrow(120,75,120,121)+arrow(135,74,177,119)+cell(59,147,21)+ellipse(120,147,18,27)+path('M176 130l9 13l23-9l-13 21l8 16l-24-8l-18 11l7-23l-6-20Z',M,1.6,'url(#mint)'),'A stem-like cell branches toward distinct cell types; the diagram does not imply every tissue can be repaired clinically.'),
 (cell(63,99,27)+arrow(99,87,137,87)+path('M139 113H102',L,1.5,extra='marker-end="url(#arrow)"')+cell(176,99,33)+path('M170 72l8 19l-14 15l17 17',L,2)+text(120,171,'STATE CHANGE / IDENTITY CONTROL',G,6.5),'Two cell states and opposed arrows symbolize reprogramming and the problem of controlling cell identity.'),
 (cell(63,63,21)+cell(171,62,21)+cell(62,142,21)+circle(167,137,28,'url(#copper)',C)+circle(167,137,38,'none',L)+path('M167 93v12M167 170v12M123 137h12M199 137h12',L,2)+path('M159 127l8 11l-7 11',C,2),'One altered cell is singled out among neighboring cells, emphasizing selective targeting rather than indiscriminate removal.'),
 (''.join(cell(x,y,13) for x,y in [(49,81),(78,81),(166,81),(195,81),(49,111),(78,111),(166,111),(195,111)])+cell(107,111,13)+cell(136,111,13)+path('M102 69Q121 43 142 69',L,2,extra='marker-end="url(#arrow)"')+text(120,164,'RESTORE STRUCTURE + FUNCTION',G,6.5),'A gap in an organized cell layer is being bridged; useful regeneration also requires integrated function.')
])
batch('fut-regenerative',[
 (''.join(path(f'M{50+i*26} 63l-17 86M37 {65+i*23}h160',L,1.2) for i in range(5))+''.join(cell(x,y,10) for x,y in [(68,79),(118,103),(165,81),(94,125),(155,133)])+text(120,179,'CELLS / SCAFFOLD / SIGNALS',G,7),'Cells sit within an engineered lattice that represents a scaffold, not a completed organ.'),
 (''.join(cell(x,y,18) for x,y in [(104,49),(138,54),(75,78),(108,84),(147,88),(174,107),(83,117),(113,122),(143,128),(108,153)])+ellipse(123,113,78,63,'none',L)+text(120,194,'MODEL / NOT A COMPLETE ORGAN',G,6.5),'A three-dimensional cluster represents an organoid that models selected organ features.'),
 (path('M115 34Q67 20 52 67Q34 130 85 161Q112 167 124 134Q138 158 169 145Q202 122 184 80Q171 38 137 48Z',L,2,'url(#blue)')+''.join(path(f'M{65+i*21} 61v84M60 {70+i*18}h112',M,.7) for i in range(5))+path('M118 38v96M135 49l17 77',C,3)+circle(118,89,8),'An organ-shaped scaffold with internal conduits represents a bioengineered replacement, distinct from an organ-support pump.'),
 (path('M59 58Q24 81 55 117L76 139L99 110Q126 78 95 57Q72 45 76 66Q68 48 59 58Z',M,2,'url(#mint)')+arrow(120,97,151,97)+path('M180 39v103M176 59l-20 38M184 59l20 38M180 142l-18 28M180 142l18 28',L,3)+circle(180,26,11)+cross(179,87,8),'A donor-organ symbol moves toward a recipient, emphasizing replacement within an existing person.'),
 (box(43,29,156,136)+path('M57 49h126M125 49v40l-10 18h20l-10-18M125 111v13',L,3)+''.join(ellipse(124,146-i*5,42,9,'none',M) for i in range(5))+path('M61 165v9M179 165v9',L,3),'A printing nozzle deposits stacked biological-material layers; printing shape is not proof of mature organ function.')
])
batch('fut-pharma',[
 (path('M74 49Q93 28 112 48L145 86Q160 105 141 123Q121 143 103 124L69 86Q52 66 74 49Z',L,2,'url(#blue)')+path('M88 104l39-36',M,2)+path('M145 52A64 64 0 1 1 62 131',M,1.6,extra='marker-end="url(#arrow)"')+text(120,185,'HEALTHSPAN / TEST THE CLAIM',G,7),'A candidate medicine and protective loop symbolize a geroprotective hypothesis, not established human lifespan extension.'),
 (circle(156,103,39,'url(#copper)',C)+path('M146 83l18 13l-12 17l15 11',C,2)+box(35,69,37,22)+path('M53 70v20',M,2)+arrow(83,81,109,89)+circle(145,63,6,'url(#blue)',L)+circle(119,90,6,'url(#blue)',L)+text(120,176,'SELECTIVITY / BENEFIT / TOXICITY',G,6.2),'Candidate compounds approach an altered cell, highlighting selectivity and toxicity as separate questions.'),
 (circle(119,97,36,'none',M)+path('M92 74l23 20l29-13M115 94l8 29',L,2)+circle(93,74,7)+circle(146,80,7)+circle(123,123,7)+arrow(119,28,119,53)+arrow(196,97,165,97)+arrow(120,166,120,141)+arrow(41,97,73,97),'Inputs converge on a metabolic network; changing a pathway does not by itself establish a general anti-aging benefit.'),
 (path('M100 30h40M109 30v58L72 144Q63 163 82 166h80Q181 165 171 145L133 88V30',L,2)+path('M84 132h76l13 21q4 10-12 10H84q-11 0-6-11Z',M,1,'url(#mint)')+circle(106,144,4)+circle(139,150,5)+circle(124,115,3)+text(120,190,'CANDIDATE / NOT A TREATMENT',G,6.5),'A research flask represents an unvalidated candidate, distinct from an established medicine.')
])
batch('fut-nano',[
 (circle(66,96,36,'url(#blue)',L)+''.join(circle(x,y,5,'url(#copper)',C) for x,y in [(52,78),(74,85),(54,107),(77,111)])+arrow(109,96,144,96)+path('M164 46Q146 96 166 152M178 46Q160 96 180 152',M,3)+circle(190,94,5,'url(#copper)',C)+text(120,181,'CARRIER / DISTRIBUTION / RELEASE',G,6.2),'A loaded carrier approaches a biological boundary; distribution and release are not the same as therapeutic benefit.'),
 (path('M37 106L67 81L95 104M126 105l29-25l32 24l24-23',M,4)+circle(96,104,6,'none',C)+circle(124,105,6,'none',C)+path('M94 48l19 22l19-22M113 69v19',L,3)+circle(111,104,6,'url(#blue)',L)+text(120,171,'TARGETED REPAIR / NOT UNIVERSAL',G,6.2),'A broken molecular chain and proposed repair element illustrate a specific damage target, not comprehensive molecular maintenance.'),
 (circle(120,101,49,'url(#blue)',L)+''.join(circle(120+math.cos(i*math.pi/6)*53,101+math.sin(i*math.pi/6)*53,5,'url(#mint)',M) for i in range(12))+circle(118,100,21,'none',C)+path('M105 100h26M118 87v26',C,2)+text(120,183,'COMPOSITION / SURFACE / CONTEXT',G,6.4),'A surface-functionalized particle represents nanoscale properties that need case-specific medical evidence.'),
 (path('M120 49l42 24v49l-42 25l-42-25V73Z',L,2,'#233140')+circle(120,98,18,'none',L)+path('M80 75L50 57L35 75M162 76l28-19l17 19M80 122l-29 22l-16-15M162 122l30 24l15-16',L,2)+text(120,104,'?',C,17)+circle(120,98,78,'none',G,extra='stroke-dasharray="3 6"')+text(120,192,'HYPOTHETICAL / NOT DEMONSTRATED',G,6.1),'An intentionally schematic molecular machine with a question mark identifies a speculative concept, not an existing repair robot.')
])
# Distinct semantic overview compositions, not a repeated count/network badge.
overviews={
 'fut-human-machine':(person(1)+path('M48 50v93M40 62h16M40 83h16M40 104h16',L,1.5)+circle(181,55,15,'none',L)+path('M181 40v30M166 55h30',L,1.3),'A biological human with an articulated arm connects human function with engineered support.'),
 'fut-cybernetic':(''.join(group(person(i),f'translate({-20+i*62} 52) scale(.4)') for i in range(4))+text(120,158,'BIOLOGICAL / HYBRID / ARTIFICIAL',G,6.4),'Four body configurations contrast biological and engineered components, without ranking humanity or predicting a sequence.'),
 'fut-digital':(path('M74 148V115Q39 95 60 58Q76 26 106 48Q128 54 125 83L137 97L123 103V126H103V148',M,2,'url(#mint)')+path('M144 41v115',L,1,extra='stroke-dasharray="3 5"')+''.join(box(x,y,10,10) for x,y in [(165,52),(183,52),(165,70),(183,70),(201,70),(165,88),(183,88),(165,106),(183,124)])+text(120,184,'A REPRESENTATION IS NOT SURVIVAL',G,6.2),'A human profile and separate digital pixels distinguish a person from a recorded or simulated representation.'),
 'fut-medicine':(path('M103 30L160 50V99Q153 133 103 160Q55 133 48 99V50Z',L,2,'url(#blue)')+cross(103,86,21)+path('M163 48v40Q163 111 187 111Q212 111 212 88V48M173 47h-19M221 47h-18M187 112v27Q187 158 168 158H155',M,3)+circle(145,158,11,'url(#copper)',C),'A care shield and stethoscope represent prevention, diagnosis, and evidence-based individual care.'),
 'fut-genetics':(helix(86,25,145,25)+path('M145 49L187 133M187 49L145 133',L,12)+path('M145 49L187 133M187 49L145 133',M,3)+circle(167,90,9,'url(#copper)',C)+text(120,191,'SEQUENCE / REGULATION / INHERITANCE',G,6),'A DNA helix beside a stylized chromosome represents genetic instructions, regulation, and disease mechanisms.'),
 'fut-cellular':(cell(91,96,53)+circle(182,71,23,'url(#mint)',M)+circle(182,128,23,'url(#mint)',M)+circle(182,71,8,'url(#copper)',C)+circle(182,128,8,'url(#copper)',C)+path('M147 96Q164 95 164 78M147 100Q164 99 164 120',L,2)+path('M72 79l13 15l-5 20M106 68l-9 19l12 21',L,1.5),'A large cell and two daughter-like cells symbolize cellular state, renewal, and the control required for cell-based repair.'),
 'fut-regenerative':(path('M55 102L123 68L193 102L123 139Z',L,2,'#182d35')+path('M55 116L123 153L193 116M55 130L123 167L193 130',L,2)+''.join(path(f'M{70+i*17} {94-i*8}l66 37',M,.8) for i in range(4))+''.join(cell(x,y,9) for x,y in [(92,96),(122,81),(122,111),(153,99)])+path('M100 28Q78 11 74 35Q75 52 99 66Q121 50 126 35Q125 10 103 28Z',C,2,'url(#copper)')+path('M99 66v10',C,2),'A layered, cell-seeded scaffold beneath an organ symbol represents rebuilding tissue architecture and function.'),
 'fut-pharma':(path('M64 38h39M73 38v40L48 134Q40 155 60 155h56Q135 155 125 135L95 78V38',M,2)+path('M61 111h52l13 29q3 10-10 10H60q-11 0-6-10Z',M,1,'url(#mint)')+path('M164 47Q178 34 191 47Q201 57 190 72L156 114Q143 130 129 117Q117 106 129 91Z',L,2,'url(#blue)')+path('M146 71l27 22',L,2)+network([(164,145),(190,137),(210,158),(182,172)],[(0,1),(1,2),(2,3),(3,0),(1,3)]),'A research flask, capsule, and molecular structure connect drug candidates with chemical mechanisms and testing.'),
 'fut-nano':(circle(107,89,44,'url(#blue)',L)+''.join(circle(107+math.cos(i*math.pi/5)*49,89+math.sin(i*math.pi/5)*49,5,'url(#mint)',M) for i in range(10))+circle(107,89,18,'none',C)+path('M151 110L186 136',L,2)+circle(193,143,20,'none',L)+''.join(circle(x,y,3) for x,y in [(186,135),(199,137),(190,150),(202,150)])+path('M42 172h109M42 166v12M151 166v12M68 169v6M96 169v6M124 169v6',M,1.5)+text(102,191,'NANOSCALE / NOT TO SCALE',G,6.5),'A functionalized particle, magnified interior, and schematic scale bar represent nanoscale materials, not autonomous repair robots.')
}
for b in branches:
 body,caption=overviews[b['id']]
 add(b['id']+'-overview',body,caption,True)
 registry[b['id']]=assets[b['id']+'-overview']
for v in registry.values():v['src']+='?v=15'
Path('public/futurist-visuals.js').write_text('// Topic assets are keyed by branch::name, never by label alone.\nwindow.FUTURIST_VISUALS='+json.dumps(registry,indent=2)+';\n')
print('Created',len(registry),'Futurist assets: 46 topic diagrams and 9 branch overviews.')
