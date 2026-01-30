"use client"

import { makeRequest } from "@/api-conf"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useMutation } from "@tanstack/react-query"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PricingResult } from "./result-card"

export interface PricingInputs {
  unitCost: number
  desiredMargin: number
  competitorMinPrice: number
  competitorMaxPrice: number
}

interface PricingFormProps {
   isLoading: boolean
  setIsPending: Dispatch<SetStateAction<boolean>>
  setResult: Dispatch<SetStateAction<PricingResult | null>>
}

export function PricingForm({  isLoading ,setIsPending,setResult}: PricingFormProps) {
  const [unitCost, setUnitCost] = useState("")
  const [desiredMargin, setDesiredMargin] = useState([30])
  const [competitorMinPrice, setCompetitorMinPrice] = useState("")
  const [competitorMaxPrice, setCompetitorMaxPrice] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData,setFormData] = useState<PricingInputs | null>(null)

    const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!unitCost || Number(unitCost) <= 0) {
      newErrors.unitCost = "Please enter a valid unit cost"
    }
    if (!competitorMinPrice || Number(competitorMinPrice) <= 0) {
      newErrors.competitorMinPrice = "Please enter a valid minimum price"
    }
    if (!competitorMaxPrice || Number(competitorMaxPrice) <= 0) {
      newErrors.competitorMaxPrice = "Please enter a valid maximum price"
    }
    if (
      competitorMinPrice &&
      competitorMaxPrice &&
      Number(competitorMinPrice) > Number(competitorMaxPrice)
    ) {
      newErrors.competitorMaxPrice = "Max price must be greater than min price"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { mutate, isPending, error ,data} = useMutation({
    mutationFn: makeRequest.bind(null, formData),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: [POSTS_CACHE_KEY] });
    // },
  });
  useEffect(()=>{
    setIsPending(isPending)
  },[isPending])

  useEffect(()=>{
    if (data) {
      setResult(data)
    }
  },[data])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let input = {
       unitCost: Number(unitCost),
        desiredMargin: desiredMargin[0],
        competitorMinPrice: Number(competitorMinPrice),
        competitorMaxPrice: Number(competitorMaxPrice)
    }
    if (validate()) {
      setResult(null)
      setFormData(input)
      let v =  mutate();
    
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Input</CardTitle>
        <CardDescription>
          Enter your product costs and market data to get pricing recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="unitCost">Unit Cost</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="unitCost"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                className="pl-7"
              />
            </div>
            <p className="text-xs text-muted-foreground">Cost to produce one item</p>
            {errors.unitCost && <p className="text-xs text-destructive">{errors.unitCost}</p>}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Desired Margin</Label>
              <span className="text-sm font-medium text-primary">{desiredMargin[0]}%</span>
            </div>
            <Slider
              value={desiredMargin}
              onValueChange={setDesiredMargin}
              max={100}
              min={5}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Target profit margin percentage
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="competitorMinPrice">Competitor Min Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="competitorMinPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={competitorMinPrice}
                  onChange={(e) => setCompetitorMinPrice(e.target.value)}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">Lowest competitor price</p>
              {errors.competitorMinPrice && (
                <p className="text-xs text-destructive">{errors.competitorMinPrice}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="competitorMaxPrice">Competitor Max Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="competitorMaxPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={competitorMaxPrice}
                  onChange={(e) => setCompetitorMaxPrice(e.target.value)}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">Highest competitor price</p>
              {errors.competitorMaxPrice && (
                <p className="text-xs text-destructive">{errors.competitorMaxPrice}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Pricing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
