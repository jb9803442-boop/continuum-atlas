from create_illustrations import *
assets.clear()
L='#c4b6d8'
def profile():
 return path('M84 176V145Q67 131 72 114L57 106L70 87Q65 46 102 31Q142 19 160 54Q170 85 153 126V176',M,1.8,'url(#mint)')
def exchange():return arrow(108,100,137,100,L)
def circuit(x,y,w=30):
 return path(f'M{x} {y}h{w/2}v20h{w/2}M{x} {y+35}h{w/2}v-20h{w/2}',L,1.5)+circle(x,y,3,'#18241f',L)+circle(x+w,y+20,3,'#18241f',L)+circle(x,y+35,3,'#18241f',L)
s=profile()+path('M120 33V178',L,1,extra='stroke-dasharray="3 5"')+path('M98 73Q86 62 88 51M87 94Q111 71 111 113M99 127Q84 133 83 116',C,2)+circuit(125,60,27)+circuit(124,111,22)+text(120,194,'CONTINUITY / CHANGE',G,7)
add('identity-you',s,'A divided human profile contrasts biological form and schematic circuitry as a question about identity.',True)
s=path('M55 34Q36 39 37 70L49 111L70 151L95 139L seventy 98'.replace('seventy','70'),M,2,'url(#mint)')+path('M70 98L73 58Q75 33 55 34',M,2,'url(#mint)')+path('M58 58L61 101L eighty 137'.replace('eighty','80'),C,3)
s+=path('M170 35L152 46L153 91L164 111L181 148L203 138L182 99V48Z',L,1.8,'#273038')+circle(168,97,10,'#152922',L)+circle(168,97,4,'#827792',L)+path('M161 52h12v28h-12ZM174 114l17 25M182 116l15 21',L,1.5)+exchange()+text(54,181,'BIOLOGICAL',G,7)+text(176,181,'PROSTHETIC',L,7)
add('Replace your arm',s,'An organic arm and schematic prosthesis illustrate bodily change without deciding identity.',True)
s=path('M53 62C31 41 16 66 29 94L63 130Q99 100 88 73C82 54 66 52 61 69V41H52Z',C,1.5,'url(#copper)')+path('M54 75L65 119M61 96L41 88',M,1.4)+exchange()
s+=path('M175 62C153 41 138 66 151 94L185 130Q221 100 210 73C204 54 188 52 183 69V41H174Z',M,1.5,'url(#mint)')+path('M176 75L187 119M183 96L163 88',C,1.4)+path('M41 153h159',G,1,extra='stroke-dasharray="2 4"')+text(121,178,'A VITAL PART · A CONTINUING LIFE',G,7)
add('Replace your heart',s,'Two distinct hearts connected by an exchange motif symbolize organ replacement, not memory transfer.',True)
s=''
for offset in [0,125]:
 color=C if offset==0 else M
 p=path('M50 60Q35 39 24 63Q10 91 15 127Q32 131 51 112ZM66 60Q81 39 93 66Q106 96 105 127Q85 131 67 112Z',color,1.5,'url(#copper)' if offset==0 else 'url(#mint)')+path('M58 39V85L37 97M58 85L81 97',B,3)+path('M37 97L26 78M37 97L26 119M81 97L90 78M81 97L93 117',color,1.2)
 s+=group(p,f'translate({offset} 8)')
s+=arrow(110,103,130,103,L)+text(120,183,'HOW MANY PARTS MAKE A SELF?',G,7)
add('Replace your lungs',s,'A pair of lungs is exchanged for another, extending the cumulative replacement thought experiment.',True)
s=path('M24 100Q59 57 96 100Q59 143 24 100Z',M,1.7,'url(#mint)')+circle(60,100,17,'url(#copper)',C)+circle(60,100,7,'#15221c',M)+exchange()+path('M146 100Q181 57 218 100Q181 143 146 100Z',L,1.7,'#242e35')+circle(182,100,18,'none',L)+circle(182,100,9,'none',L)+path('M181 68V80M181 120V132M150 100H161M201 100H213',L,1.4)+text(120,168,'HYPOTHETICAL RESTORED PERCEPTION',G,6.5)
add('Replace your eyes',s,'A biological eye and a schematic visual substitute represent a hypothetical change in perception.',True)
s=brain()+path('M111 41L137 36Q153 42 155 57L173 67V91L154 106L126 93L116 74Z',L,1.5,'#293239')+circuit(127,55,27)+path('M165 123L194 140V167',L,1.2)+text(193,182,'SUBSTITUTE',L,7)
add('Replace portions of your brain',s,'One area of a brain is replaced by schematic circuitry; this is not an available full-function brain replacement.',True)
s=''
for i in range(5):
 x=37+i*41;y=75+(i%2)*38
 if i<2:
  s+=path(f'M{x} {y}l-13 -22M{x} {y}l-18 13M{x} {y}l11 -18M{x} {y}l12 17',M,1.2)+circle(x,y,7)
 else:
  s+=path(f'M{x-8} {y-8}h16v16h-16Z',L,1.3,'#263438')+path(f'M{x} {y-16}v8M{x} {y+8}v8M{x-16} {y}h8M{x+8} {y}h8',L,1.2)
 if i<4:s+=path(f'M{x+9} {y}L{x+32} {75+((i+1)%2)*38}',G,1.2)
s+=arrow(37,162,203,162,L)+text(120,186,'INCREMENTAL REPLACEMENT',G,7)
add('Replace more neurons',s,'A chain moves from biological neurons to circuit-like substitutes while connections are assumed to continue.',True)
s=profile()+path('M91 49L110 61L98 84L120 100L99 116L118 135L109 162',L,1.7)+circuit(123,57,27)+circuit(125,112,20)+path('M89 143L104 129M93 69L110 69M113 102L139 93',L,1.5)
for x,y in [(91,49),(98,84),(120,100),(99,116),(109,162),(137,150)]:s+=circle(x,y,3,'#1b2826',L)
s+=text(120,195,'SAME PATTERN ≠ SETTLED IDENTITY',G,6.5)
add('Replace entire biological substrate',s,'A fully schematic profile represents a speculative nonbiological substrate, without claiming survival or consciousness.',True)
branch={k:v for k,v in assets.items() if k=='identity-you'}
topics={k:v for k,v in assets.items() if k!='identity-you'}
Path('public/philosopher-visuals.js').write_text('// Independent conceptual illustrations for the identity thought experiment.\nwindow.PHILOSOPHER_BRANCH_VISUALS='+json.dumps(branch,indent=2)+';\nObject.assign(window.TOPIC_VISUALS,'+json.dumps(topics,indent=2)+');\n')
print('Created',len(topics),'identity-step illustrations and',len(branch),'overview illustration.')
