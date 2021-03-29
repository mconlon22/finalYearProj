class RiskCalc:
    totalPeople=17278392
    totalDeaths=10926
    def __init__(self,user):
        self.user=user

    def getAgeRisk(self):
        if self.user.age>0 and self.user.age<39:
            return 5914384/RiskCalc.totalPeople,54/RiskCalc.totalDeaths
        if self.user.age>39 and self.user.age<49:
            return 2849984/RiskCalc.totalPeople,140 /RiskCalc.totalDeaths
        if self.user.age>49 and self.user.age<59:
            return 3051110/RiskCalc.totalPeople,522/RiskCalc.totalDeaths
        if self.user.age>59 and self.user.age<69:
            return 2392392/RiskCalc.totalPeople,1001 /RiskCalc.totalDeaths
        if self.user.age>69 and self.user.age<79:
            return 1938842/RiskCalc.totalPeople,2635/RiskCalc.totalDeaths
        if self.user.age>80 :
            return 1131680/RiskCalc.totalPeople,6474/RiskCalc.totalDeaths
    def getSexRisk(self):

        if self.user.sex=='female':
            return 8647989/RiskCalc.totalPeople,4764/RiskCalc.totalDeaths
        if self.user.sex=='male':
            return 8630403/RiskCalc.totalPeople,6162/RiskCalc.totalDeaths
    def getBmiRisk(self):
        bmi = self.user.weight/(self.user.height*self.user.height)
        print(bmi)
        if bmi <= 18.5:
            return 310721/RiskCalc.totalPeople,522/RiskCalc.totalDeaths

        elif bmi > 18.5 and bmi < 25:
            return 4763150/RiskCalc.totalPeople,3364/RiskCalc.totalDeaths

        elif bmi > 25 and bmi < 30:
            return 4682906/RiskCalc.totalPeople,3068/RiskCalc.totalDeaths

        elif bmi > 30 and bmi<35:
            return 2384406/RiskCalc.totalPeople,1813/RiskCalc.totalDeaths
        elif bmi > 35 and bmi<40:
            return 922398/RiskCalc.totalPeople,762/RiskCalc.totalDeaths
        elif bmi > 40:
            return 463042/RiskCalc.totalPeople,379/RiskCalc.totalDeaths
    def getSmokingRisk(self):
        if self.user.smoking == 'never':
            return 7924739/RiskCalc.totalPeople,3598/RiskCalc.totalDeaths

        elif self.user.smoking =='former':
            return 5690966/RiskCalc.totalPeople,6531/RiskCalc.totalDeaths

        elif self.user.smoking=='current' :
            return 2941764/RiskCalc.totalPeople,708/RiskCalc.totalDeaths
    def getEthnicityRisk(self):
        if self.user.ethnicity=='white':
            return 10866411/RiskCalc.totalPeople,7119/RiskCalc.totalDeaths
        if self.user.ethnicity=='mixed':
            return 169697/RiskCalc.totalPeople,62/RiskCalc.totalDeaths
        if self.user.ethnicity=='south asian':
            return 1022130/RiskCalc.totalPeople,608/RiskCalc.totalDeaths
        if self.user.ethnicity=='black':
            return 339909/RiskCalc.totalPeople,250/RiskCalc.totalDeaths
        if self.user.ethnicity=='other':
            return 320132/RiskCalc.totalPeople,110/RiskCalc.totalDeaths

    def getRisk(self):
        numInGroup,numDied=self.getAgeRisk()
        sexGroupMult,sexDiedMult=self.getSexRisk()
        bmiGroupMult,bmiDiedMult=self.getBmiRisk()
        smokingGroupMult,smokingDiedMult=self.getSmokingRisk()
        ethnicityGroupMult,ethnicityDiedMult=self.getEthnicityRisk()
        totalRisk=(numDied*sexDiedMult*bmiDiedMult*smokingDiedMult*ethnicityDiedMult)/(numInGroup*sexGroupMult*bmiGroupMult*smokingGroupMult*ethnicityGroupMult)
        return (totalRisk/28)*5










class User:
    def __init__(self,age,sex,height,weight,smoking,ethnicity):
        self.age=age
        self.sex=sex
        self.height=height/100
        self.weight=weight
        self.smoking=smoking
        self.ethnicity=ethnicity

    def getRisk(self):
        return RiskCalc(self).getRisk()


