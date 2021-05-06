import random 
import math
import matplotlib.pyplot as plt
import math
import numpy as np

def testGroup(N,d):
    numcollisions=0
    # we are doing 1000000 iterations 
    iterations=100000
    for i in range(0,iterations):
        #generate group of N, d bit hashes
        group=[]

        for j in range(0,N):
            bits=random.getrandbits(d)
            if bits not in group:
                group.append(bits)
            else:
                numcollisions+=1
                break
    return numcollisions/iterations

def calculateProbability(d):
    Ns=[]
    probabilitys=[]
    formulaResults=[]
    for x in range(2,d):
        N=int(math.pow(2,x))
        Ns.append(N)
        probabilitys.append(testGroup(N,d))
        formulaResults.append(1-np.exp((-N**2)/(2*(2**d))))
    print(Ns, probabilitys,formulaResults)
    plt.plot(Ns, probabilitys)
    plt.plot(Ns, formulaResults)


    plt.show()
calculateProbability(8)
