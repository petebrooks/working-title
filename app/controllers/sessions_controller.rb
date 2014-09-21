class SessionsController < ApplicationController

  def new
    redirect_to root_path if current_user
    @user = User.new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      status = true
    else
      status = false
    end

    respond_to do |format|
      format.js {
        if status
          sign_in @user
          render json: user_path(@user).to_json
        else
          render json: false.to_json
        end
      }
      format.html {
        if status
          sign_in @user
          redirect_to user_path(@user)
        else
          flash.now[:error] = "Email or password not found."
          render :new
        end
      }
    end

  end

  def destroy
    sign_out
    redirect_to root_url
  end
end
