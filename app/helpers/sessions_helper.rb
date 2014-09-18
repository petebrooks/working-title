module SessionsHelper
  def sign_in(user)
    session[:user_id] = user.id
    self.current_user = user
  end

  def current_user
    @current_user = session[:user_id] ? User.find(session[:user_id]) : nil
  end

  def current_user=(user)
    @current_user = user
  end

  def sign_out
    session.delete(:user_id)
    self.current_user = nil
  end

end
