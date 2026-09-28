from create_illustrations import *
assets.clear()
L='#c4b0d7'
s=path('M119 171V112',L,2.5)
for x,y in [(40,59),(74,37),(111,25),(148,32),(184,49),(206,83)]:s+=path(f'M119 112Q{x} 113 {x} {y+8}',M,1.4)+circle(x,y,8,'url(#copper)',C)
s+=circle(119,112,13,'url(#mint)',M)+text(120,193,'POSSIBILITIES / NOT PREDICTIONS',G,6.5)
add('future-overview',s,'A branching horizon represents six exploratory futures without assigning probabilities.',True)
s=path('M69 28H163M69 173H163M78 30Q80 77 117 99Q80 125 79 170M155 30Q155 76 122 99Q155 125 155 170',L,2)+path('M89 62H145L119 91ZM90 162L118 132L146 162Z',C,1.5,'url(#copper)')+path('M119 100v27',C,1.5,extra='stroke-dasharray="2 4"')+circle(184,137,18)+path('M180 123l8 13l-9 10',C,1.5)+circle(43,81,13)
add('Aging remains mostly unsolved',s,'An hourglass and imperfectly maintained cells symbolize continued biological limits alongside care.',True)
s=path('M29 151H70V127H112V101H154V82H211',M,3)+path('M34 113Q85 82 132 57T209 43',L,2)+path('M28 172H213',G,1)+circle(72,81,6)+circle(132,57,6)+circle(204,44,6,'url(#copper)',C)+text(120,194,'MORE HEALTHY TIME / FINITE LIFE',G,6.5)
add('Moderate lifespan extension',s,'Incremental steps and a leveling curve symbolize limited gains, not a quantified lifespan forecast.',True)
s=cell(120,98,41)+path('M72 47A71 71 0 0 1 186 120',L,2,extra='marker-end="url(#arrow)"')+path('M167 157A71 71 0 0 1 53 76',M,2,extra='marker-end="url(#arrow)"')
for x,y in [(72,47),(168,158)]:s+=circle(x,y,5,'url(#copper)',C)
s+=path('M108 94h24M120 82v24',M,2)+text(120,191,'DURABLE REPAIR / A HYPOTHESIS',G,6.5)
add('Major biological rejuvenation',s,'A cell within a renewal loop represents hypothetical durable restoration across biological systems.',True)
s=circle(116,39,15)+path('M115 55V121M112 68L82 103L66 142M113 121L89 173M118 121L144 173',M,4)+path('M122 66L148 81L170 122M127 74L145 87L160 120',L,4)+circle(148,84,8,'#25232f',L)+circle(167,121,7,'#25232f',L)+path('M174 123L183 141M167 129L173 145M161 129L164 145',L,2)+path('M107 67L98 80L106 108M119 68L128 82L121 108',C,1.7)
add('Human-machine integration',s,'A biological figure with a schematic mechanical arm represents deeper technological support and integration.',True)
s=path('M48 87Q25 54 51 40Q61 16 88 29Q108 15 125 32Q155 21 169 46Q199 50 190 77Q211 100 183 121H72Q44 117 48 87Z',L,1.5,'#242735')
pts=[(76,61),(106,49),(142,60),(99,88),(154,97),(179,76)]
s+=network(pts,[(0,1),(1,2),(0,3),(1,3),(2,4),(3,4),(2,5),(4,5)])+path('M85 124V148H68M120 125V157M154 125V148H172',L,1.5)
for x,y in [(64,149),(120,162),(177,149)]:s+=path(f'M{x-7} {y-7}h14v14h-14Z',C,1.4,'url(#copper)')
add('Digital minds become possible',s,'A network above nonbiological circuitry represents a conditional digital-mind scenario, not evidence of consciousness.',True)
s=''
for r,angle in [(66,0),(48,40),(28,80)]:s+=ellipse(120,98,r,r*.55,'none',L,extra=f'transform="rotate({angle} 120 98)"')
for x,y,r in [(40,37,4),(185,45,6),(198,154,3),(56,157,5),(123,96,8),(152,179,3)]:s+=circle(x,y,r,'url(#copper)',C)
s+=path('M40 37L80 71M185 45L158 74M56 157L86 129M152 179L141 144',G,1,extra='stroke-dasharray="2 5"')+text(120,195,'BEYOND CURRENT CATEGORIES',G,6.5)
add('Unknown post-human civilization',s,'Unfamiliar nested forms mark conceptual uncertainty, not a depiction of a known future civilization.',True)
keys=[k for k in assets if k!='future-overview']
branch={'future-overview':assets['future-overview']}
for letter,key in zip('abcdef',keys):branch['future-'+letter]=assets[key]
Path('public/future-visuals.js').write_text('// Conceptual future illustrations; never presented as forecasts.\nwindow.FUTURE_BRANCH_VISUALS='+json.dumps(branch,indent=2)+';\nObject.assign(window.TOPIC_VISUALS,'+json.dumps({k:assets[k] for k in keys},indent=2)+');\n')
print('Created 6 scenario illustrations and a future overview.')
