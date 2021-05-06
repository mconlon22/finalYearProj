import math
import time

def get_factors_of(num):
    t0 = time.time()
    val = math.floor(math.sqrt(num)) 
    while val < num:
       
        print(val)
        if num % val == 0:
            t1 = time.time()
            print(t1 - t0)
            return {'p':num/val,'q':val}
        val += 1
vals=get_factors_of(26742150751)
print(vals)

