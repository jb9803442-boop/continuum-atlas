from pathlib import Path
import json
exec(Path('create_illustrations.py').read_text().split("add('DNA'")[0])
L='#dbbd83'
def body():return circle(120,34,12)+path('M120 49V113M117 63L90 101M124 63L150 101M120 113L99 162M120 113L142 162',M,5)
items=[
 (body()+path('M45 166V45M40 45h10M40 166h10',L,1.5)+text(120,189,'A FINITE HUMAN LIFE',G,7),'A human figure beside a bounded line represents a finite life, not a fixed lifespan.'),
 (path('M120 30L176 49V101Q163 139 120 164Q76 139 64 101V49Z',M,2,'url(#mint)')+path('M94 87h52M120 61v52',L,4)+path('M38 177H202',G,2)+path('M40 177H145',M,4),'A shield and care symbol above a partly highlighted life line distinguish healthy time from total time.'),
 (path('M30 153H213',G,1.5)+path('M37 126Q58 71 90 86T147 60T200 44',M,3)+path('M36 142Q58 96 82 115T131 115',L,2,extra='stroke-dasharray="4 5"')+arrow(151,133,203,133)+text(120,185,'MORE YEARS / TEST THE BASELINE',G,6.5),'Two qualitative survival trajectories and an extension arrow symbolize a lifespan claim without numerical predictions.'),
 (cell(120,98,43)+path('M67 48A73 73 0 0 1 188 124',L,2,extra='marker-end="url(#arrow)"')+path('M171 151A73 73 0 0 1 54 77',M,2,extra='marker-end="url(#arrow)"')+path('M109 99h22M120 88v22',L,2.5)+text(120,191,'RESTORATION / DURABILITY / SAFETY',G,6.2),'A cell inside a restoration loop represents a rejuvenation hypothesis that still requires functional and safety evidence.'),
 (body()+path('M153 47A65 65 0 0 1 171 149',L,2,extra='marker-end="url(#arrow)"')+path('M76 149A65 65 0 0 1 75 48',L,2,extra='marker-end="url(#arrow)"')+path('M111 69Q98 60 98 74Q98 84 113 96Q130 82 131 73Q131 61 117 68Z',C,1.6,'url(#copper)')+circle(54,92,12,'url(#blue)',B)+circle(185,105,12,'url(#blue)',B),'A human with a highlighted organ and exchange loops symbolizes repeated replacement, not renewal of every system.'),
 (body()+path('M126 61L153 93L163 120M123 116L146 163',B,7)+circle(153,93,7,'#182b33',B)+circle(136,142,6,'#182b33',B)+path('M104 68h16v17h-16ZM99 76H81M113 89v15M127 76h15',L,1.5)+text(120,190,'BIOLOGY + ENGINEERED SUPPORT',G,6.5),'A biological figure incorporates mechanical support and circuitry while leaving questions about maintenance and continuity open.')
]
for i,(art,caption) in enumerate(items):add('immortality-level-'+str(i),art,caption,True)
Path('public/immortality-levels-visuals.js').write_text('window.IMMORTALITY_LEVEL_VISUALS='+json.dumps([c for _,c in items])+';\n')
print('Created six distinct level illustrations.')
