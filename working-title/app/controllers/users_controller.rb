class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(new_user_params)

    if @user.save
      sign_in(@user)
      redirect_to root_path
    else
      flash.now[:error] = "Wrong. Try again."
      render 'new'
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to @user
    else
      flash.now[:error] = "Sorry, no. Try again."
      render 'edit'
    end
  end

  def destroy
    @user = User.find(params[:id])
    sign_out
    @user.destroy
    redirect_to root_path
  end

  private

  def new_user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end

end














