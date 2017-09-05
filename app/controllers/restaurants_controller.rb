class RestaurantsController < ApplicationController
  def show
    @restaurant = Koala::Facebook::API.new(app_access_token).get_object(fb_id, fields: fields)
    respond_to do |format|
      format.json { render json: @restaurant }
    end
  end

  private

    def app_access_token
      @_app_access_token ||= Koala::Facebook::OAuth.new(
        ENV['FB_APP_ID'], ENV['FB_APP_SECRET']
      ).get_app_access_token
    end

    # Grab facebook id from URL
    def fb_id
      params[:id]
    end

    # These are the fields that we want from the facebook Graph API
    def fields
      ["about, name, hours"]
    end
end
