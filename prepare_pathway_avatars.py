from PIL import Image
import numpy as np
from pathlib import Path
# Black-matted holograms converted to straight-alpha assets. Retain the full
# original canvas so the existing fit camera keeps identical framing.
for name in ['philosopher','futurist']:
    rgb=np.asarray(Image.open(f'{name}-male-source.png').convert('RGB'),dtype=np.float32)/255
    brightness=rgb.max(axis=2)
    alpha=np.clip((brightness-0.025)/0.975,0,1)
    color=np.clip(rgb/np.maximum(alpha[:,:,None],1/255),0,1)
    color[alpha==0]=0
    rgba=np.dstack((color,alpha))
    dest=Path(f'public/{name}-male-avatar.png')
    Image.fromarray(np.rint(rgba*255).astype('uint8'),'RGBA').save(dest,optimize=True)
    print(dest)
