class CalculatorController < ApplicationController

  def index
  	
  end

  def calc
  	distance = params[:dist].to_f
  	weight = params[:weight].to_f
  	hike_pace = params[:pace].to_f
  	elev_gain = params[:elevg].to_f
  	@calories = get_calories_burnt(distance,weight,hike_pace,elev_gain).to_i
  	duration_mins = finish_time_mins(hike_pace,distance)
  	@hours  = (duration_mins/60).to_i
  	@mins = (duration_mins % 60).to_i
  end


  private 
  # Note: elevation stats were already converted to miles for display
  def get_calories_burnt(dist, wt, hp, gain)
  	total_calories = cal_per_pound_per_mile(dist, wt, hp) + calories_elevation_gain(gain) 
  end

  def cal_per_pound_per_mile(dist, wt, hp)
  	# Obtained from http://www.runnersworld.com/peak-performance/running-v-walking-how-many-calories-will-you-burn
  	# Calories burn PER MILE: walking 0.52 x weight in lb, for running 0.72x x weight in lb
  	# Guestimated factor since the average person hikes 2-3 miles per hour : if hiking pace is <=2 mile per hour use walking factor else use running factor
  	if(hp <= 2)
  		cal_count = 0.52 * wt * dist 
  	else
  		cal_count = 0.72 * wt * dist
  	end
  	cal_count
  end

  def calories_elevation_gain(gain)
  	# Another factor grabbed from web 260 calories burnt additionally per 1000ft elevation gain (~0.19 miles) 
  	# or 1368 calories per mile
  	gain * 1368;
  end

  def finish_time_mins(hp, dist)
  	minutes = dist * 60/ hp
  end

end